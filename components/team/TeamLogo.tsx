"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamLogoProps {
  src?: string;
  alt: string;
  className?: string;
}

export function TeamLogo({ src, alt, className = "" }: TeamLogoProps) {
  const [imgSrc, setImgSrc] = useState(
    src || "https://dummyimage.com/100x100/ccc/fff&text=FC"
  );

  return (
    <div
      className={`relative h-8 w-8 rounded-full overflow-hidden bg-muted flex-shrink-0 ${className}`}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() =>
          setImgSrc("https://dummyimage.com/100x100/ccc/fff&text=FC")
        }
      />
    </div>
  );
}
