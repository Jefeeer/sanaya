const words = ["Weddings", "Debuts", "Christmas parties", "Anniversaries", "Team buildings", "Baptisms", "Reunions", "Seminars"];

export function Marquee() {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {words.map((w) => (
        <li key={w} className="flex items-center gap-8 px-4 text-lg italic text-moss/80 sm:text-xl">
          {w}
          <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-gold/25 py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
