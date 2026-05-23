import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  compact?: boolean;
};

export default function SiteLogo({ href = "/", compact = false }: Props) {
  const content = (
    <>
      <Image
        src="/logo.png"
        alt="Lue & Perez logo"
        width={compact ? 40 : 64}
        height={compact ? 40 : 64}
        priority={!compact}
        className={compact ? "h-10 w-10 sm:h-11 sm:w-11" : "h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16"}
      />
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-900 sm:text-sm sm:tracking-[0.16em]">
          Lue & Perez
        </div>
        <div className="hidden text-sm text-slate-600 md:block">Marketing &amp; Distribution</div>
      </div>
    </>
  );

  return (
    <Link href={href} className="flex items-center gap-2 sm:gap-3">
      {content}
    </Link>
  );
}
