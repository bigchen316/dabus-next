"""Render the base figure around its head's vertical axis, using Blender's Python."""
import argparse
import json
import math
import os
import sys

import bpy
import bmesh
from mathutils import Vector


def value(node, names, amount):
    for name in names:
        if name in node.inputs:
            node.inputs[name].default_value = amount
            return


def midpoint(values):
    ordered = sorted(values)
    # Ignore isolated hair tips and small nose protrusions when finding the skull axis.
    return (ordered[int(len(ordered) * .01)] + ordered[int((len(ordered) - 1) * .99)]) / 2


def render(model, output):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=model)
    meshes = [obj for obj in bpy.context.scene.objects if obj.type == 'MESH']
    if not meshes:
        raise RuntimeError('The base model contains no mesh.')
    bpy.ops.object.select_all(action='DESELECT')
    for obj in meshes:
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
    bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    bpy.ops.object.join()
    figure = bpy.context.view_layer.objects.active
    mesh = figure.data
    low = min(vertex.co.z for vertex in mesh.vertices)
    high = max(vertex.co.z for vertex in mesh.vertices)
    height = .09
    scale = height / (high - low)
    for vertex in mesh.vertices:
        vertex.co.z -= low
        vertex.co *= scale
    # Match the existing home figure: remove the thin scan base below the shoes.
    editable = bmesh.new()
    editable.from_mesh(mesh)
    bmesh.ops.delete(editable, geom=[vertex for vertex in editable.verts if vertex.co.z < height * .005], context='VERTS')
    editable.to_mesh(mesh)
    editable.free()
    # The head band excludes shoes, torso, chin and the tallest hair spikes.
    head = [vertex.co for vertex in mesh.vertices if .65 * height <= vertex.co.z <= .87 * height]
    if len(head) < 10:
        raise RuntimeError('Unable to determine the head axis.')
    axis_x = midpoint([point.x for point in head])
    axis_y = midpoint([point.y for point in head])
    for vertex in mesh.vertices:
        vertex.co.x -= axis_x
        vertex.co.y -= axis_y
    mesh.update()
    figure.rotation_mode = 'XYZ'
    bpy.ops.object.shade_smooth()
    for material in mesh.materials:
        if not material.use_nodes:
            continue
        shader = next((node for node in material.node_tree.nodes if node.type == 'BSDF_PRINCIPLED'), None)
        if shader:
            value(shader, ['Specular IOR Level', 'Specular'], .3)
            value(shader, ['Coat Weight', 'Clearcoat'], 0)

    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = 64
    scene.cycles.use_denoising = True
    scene.render.threads_mode = 'FIXED'
    scene.render.threads = 4
    try:
        preferences = bpy.context.preferences.addons['cycles'].preferences
        for device_type in ('OPTIX', 'CUDA', 'HIP', 'METAL', 'ONEAPI'):
            try:
                preferences.compute_device_type = device_type
                preferences.get_devices()
                if any(device.type == device_type for device in preferences.devices):
                    for device in preferences.devices:
                        device.use = device.type == device_type
                    scene.cycles.device = 'GPU'
                    break
            except Exception:
                continue
    except Exception:
        pass

    world = bpy.data.worlds.new('Studio world')
    scene.world = world
    world.use_nodes = True
    background = world.node_tree.nodes.get('Background')
    background.inputs[0].default_value = (.85, .85, .87, 1)
    background.inputs[1].default_value = .15
    lights = [
        ('Key', (-.4, -.4, .45), 8, (1, .96, .90)),
        ('Fill', (.45, -.3, .2), 1.2, (1, .98, .95)),
        ('Rim', (.2, .5, .4), 8, (.72, .8, 1)),
        ('Rim warm', (-.3, .45, .35), 4, (.8, .72, 1)),
        ('Top', (0, 0, .7), 1, (1, 1, 1)),
    ]
    target = Vector((0, 0, height / 2))
    for name, position, energy, color in lights:
        bpy.ops.object.light_add(type='AREA', location=position)
        light = bpy.context.object
        light.name = name
        light.data.energy = energy
        light.data.shape = 'DISK'
        light.data.size = .6
        light.data.color = color
        light.rotation_euler = (target - light.location).to_track_quat('-Z', 'Y').to_euler()

    bpy.ops.object.camera_add(location=(0, -.4, .075))
    camera = bpy.context.object
    camera.rotation_euler = (target - camera.location).to_track_quat('-Z', 'Y').to_euler()
    # Fixed orthographic framing prevents depth changes from making the head swell or orbit.
    camera.data.type = 'ORTHO'
    camera.data.ortho_scale = .112
    scene.camera = camera
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 1500
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.view_settings.view_transform = 'AgX'
    scene.view_settings.look = 'AgX - Medium High Contrast'
    scene.view_settings.exposure = -.6

    os.makedirs(output, exist_ok=True)
    for index in range(24):
        figure.rotation_euler.z = math.tau * index / 24
        scene.render.filepath = os.path.join(output, f'f_{index:02d}.png')
        print(f'Head-axis turntable: {index + 1}/24', flush=True)
        bpy.ops.render.render(write_still=True)
    with open(os.path.join(output, 'axis.json'), 'w', encoding='utf-8') as manifest:
        json.dump({'axisX': 600, 'width': 1200, 'height': 1500,
                   'headCenter': [axis_x, axis_y], 'frames': 24}, manifest, indent=2)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', required=True)
    parser.add_argument('--out', required=True)
    arguments = parser.parse_args(sys.argv[sys.argv.index('--') + 1:])
    render(arguments.model, arguments.out)
