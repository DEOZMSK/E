interface ToolCardProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

export function ToolCard({ title, active, onClick }: ToolCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition active:scale-[0.99] ${
        active
          ? "border-cyan-400/80 bg-cyan-500/20 shadow-[0_0_0_1px_rgba(34,211,238,0.45)]"
          : "border-white/15 bg-white/5"
      }`}
    >
      {title}
    </button>
  );
}
