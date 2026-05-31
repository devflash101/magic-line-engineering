import Image from "next/image";
import Link from "next/link";
import siteLogo from "../../../public/logo.png";
import heroLogo from "../../../public/logo-hero.png";

type LogoProps = {
  className?: string;
  priority?: boolean;
  href?: string | false;
  variant?: "site" | "hero";
};

export default function Logo({
  className = "h-10 w-auto",
  priority = false,
  href = "/",
  variant = "site",
}: LogoProps) {
  const src = variant === "hero" ? heroLogo : siteLogo;

  const image = (
    <Image
      src={src}
      alt="Magic Line — Architecture · Structural · MEP"
      width={640}
      height={256}
      className={className}
      priority={priority}
      unoptimized
      sizes={variant === "hero" ? "(max-width: 768px) 88vw, 640px" : "(max-width: 768px) 40vw, 220px"}
    />
  );

  if (href === false || href === "") return image;

  return (
    <Link href={href} className="inline-flex items-center shrink-0">
      {image}
    </Link>
  );
}
