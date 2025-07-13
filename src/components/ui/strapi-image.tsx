import Image from "next/image";
import { useState } from "react";

interface StrapiImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function StrapiImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
  sizes,
}: StrapiImageProps) {
  const [error, setError] = useState(false);

  // Função para normalizar URL do Strapi
  const normalizeStrapiUrl = (url: string) => {
    if (!url) return "";

    // Se já é uma URL completa, retorna como está
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Se é uma URL relativa, adiciona o domínio do Strapi
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    return `${strapiUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const normalizedSrc = normalizeStrapiUrl(src);

  // Se houve erro ao carregar a imagem, mostrar fallback
  if (error) {
    return (
      <div
        className={`bg-muted flex items-center justify-center text-muted-foreground ${className}`}
        style={fill ? {} : { width, height }}
      >
        <span className="text-sm">Imagem não disponível</span>
      </div>
    );
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setError(true)}
      unoptimized={false}
    />
  );
}
