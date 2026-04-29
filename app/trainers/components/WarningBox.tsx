interface WarningBoxProps {
  text?: string;
}

export function WarningBox({ text }: WarningBoxProps) {
  if (!text) return null;
  return <p className="text-sm text-amber-200">{text}</p>;
}
