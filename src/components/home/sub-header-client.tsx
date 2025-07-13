"use client";

import { TextGenerateEffect } from "../ui/text-generate-effect";

interface SubHeaderClientProps {
  title: string;
  className?: string;
}

export function SubHeaderClient({ title, className }: SubHeaderClientProps) {
  return <TextGenerateEffect words={title} className={className} />;
}
