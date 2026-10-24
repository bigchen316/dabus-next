(() => {
  if (document.documentElement.dataset.embed !== "card") return;
  document.querySelector(".collect h2 > span").textContent = "我的收集";
  document.querySelector(".egg-line > span:last-child").textContent = "集齐8款解锁彩蛋";
  if (window.parent === window) return;
  const sendHeight = () => window.parent.postMessage({ type: "dabus:blindbox-size", height: Math.ceil(document.querySelector(".wrap").getBoundingClientRect().height) }, location.origin);
  window.addEventListener("message", event => {
    if (event.origin === location.origin && event.source === window.parent && event.data?.type === "dabus:blindbox-measure") sendHeight();
  });
  new ResizeObserver(sendHeight).observe(document.querySelector(".wrap"));
  // Tab 进入舞台后按回车也可以开盒；结果出现后将焦点交给“再拆一盒”。
  const holder = document.getElementById("holder");
  const again = document.getElementById("againBtn");
  new MutationObserver(() => {
    if (!again.hidden && document.activeElement === holder) again.focus({ preventScroll: true });
  }).observe(again, { attributes: true, attributeFilter: ["hidden"] });
  sendHeight();
})();
