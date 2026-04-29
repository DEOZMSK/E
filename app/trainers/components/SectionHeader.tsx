interface SectionHeaderProps {
  text: string;
}

export function SectionHeader({ text }: SectionHeaderProps) {
  return <p className="text-sm text-neutral-300">{text}</p>;
}
