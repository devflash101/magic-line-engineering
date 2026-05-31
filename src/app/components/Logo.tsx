import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  priority?: boolean;
  href?: string | false;
};

export default function Logo({
  className = "h-10 w-auto",
  priority = false,
  href = "/",
}: LogoProps) {
  const image = (
    <Image
      src="/logo.png"
      alt="Magic Line — Architecture · Structural · MEP"
      width={640}
      height={256}
      className={className}
      priority={priority}
      sizes="(max-width: 768px) 88vw, 640px"
    />
  );

  if (href === false || href === "") return image;

  return (
    <Link href={href} className="inline-flex items-center shrink-0">
      {image}
    </Link>
  );
}
