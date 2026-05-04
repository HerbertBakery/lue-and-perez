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
        width={compact ? 48 : 72}
        height={compact ? 48 : 72}
        priority={!compact}
        className={compact ? "h-12 w-12" : "h-14 w-14 md:h-16 md:w-16"}
      />
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 sm:text-sm sm:tracking-[0.16em]">
          Lue & Perez
        </div>
        <div className="hidden text-sm text-slate-600 sm:block">Marketing &amp; Distribution</div>
      </div>
    </>
  );

  return (
    <Link href={href} className="flex items-center gap-2.5 sm:gap-3">
      {content}
    </Link>
  );
}
