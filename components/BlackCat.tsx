export default function BlackCat({ isArrived = false }: { isArrived?: boolean }) {
  return (
    <svg
      className={`black-cat${isArrived ? " is-arrived" : ""}`}
      viewBox="0 0 140 100"
      role="img"
      aria-label="跟车的小黑猫"
    >
      <g className="black-cat-tail" fill="none" stroke="#17151c" strokeLinecap="round" strokeWidth="9">
        <path d="M34 78C11 84 9 57 28 54c15-2 18 15 7 20" />
      </g>
      <path className="black-cat-body" d="M34 78c5-20 16-28 35-28s31 12 34 28H34Z" fill="#17151c" />
      <path className="black-cat-head" d="m36 48 4-27 17 13c8-4 18-4 26 0l17-13 4 28c0 18-15 30-34 30S36 66 36 48Z" fill="#17151c" />
      <path d="m43 28 2-14 10 12" fill="#17151c" />
      <path d="m92 26 10-12 2 15" fill="#17151c" />
      <path d="M43 27 45 19l7 8" fill="#d95cdd" />
      <path d="m94 27 7-8 1 9" fill="#d95cdd" />
      <ellipse cx="57" cy="48" rx="4.5" ry="7" fill="#fff1a8" />
      <ellipse cx="87" cy="48" rx="4.5" ry="7" fill="#fff1a8" />
      <circle cx="58" cy="49" r="1.8" fill="#17151c" />
      <circle cx="86" cy="49" r="1.8" fill="#17151c" />
      <path d="m69 57 3 2 3-2" fill="none" stroke="#d95cdd" strokeLinecap="round" strokeWidth="2" />
      <path d="M52 58H38m14 5H39m48-5h14m-14 5h13" fill="none" stroke="#fffaf1" strokeLinecap="round" strokeWidth="1.5" />
      <path className="black-cat-arm" d="M97 67c13-6 17 2 11 11-4 5-10 4-14 0" fill="#17151c" />
      <path d="M46 76c4 4 9 5 14 5m27-5c-4 4-9 5-14 5" fill="none" stroke="#4c4386" strokeLinecap="round" strokeWidth="3" />
      <path d="M47 73h43" stroke="#fff1a8" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}
