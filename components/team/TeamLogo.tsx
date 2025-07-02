"use client";

import Image from "next/image";
import { useState } from "react";
import { Shield } from "lucide-react";

interface TeamLogoProps {
  src?: string;
  alt: string;
  className?: string;
  showFallback?: boolean;
}

export function TeamLogo({ src, alt, className = "", showFallback = true }: TeamLogoProps) {
  const [imgSrc, setImgSrc] = useState(src || (showFallback ? "https://dummyimage.com/100x100/ccc/fff&text=FC" : ""));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    if (showFallback) {
      setImgSrc("https://dummyimage.com/100x100/ccc/fff&text=FC");
    }
  };

  return (
    <div
      className={`relative h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 border-2 border-white shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      {imgSrc && !hasError ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          onError={handleError}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-blue-600">
          <Shield className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
}
