import { ReactNode, useId, useState } from "react";

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  hint?: ReactNode;
}

export function NumberField({ label, value, onChange, className, hint }: NumberFieldProps) {
  const [isHintOpen, setIsHintOpen] = useState(false);
  const hintId = useId();

  return (
    <label className={className}>
      <div className="mb-1 flex items-center gap-2">
        <span className="text-sm text-neutral-200">{label}</span>
        {hint && (
          <button
            type="button"
            onClick={() => setIsHintOpen((prev) => !prev)}
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/30 text-[11px] text-cyan-100/90 transition hover:border-cyan-300/60 hover:bg-cyan-400/10 ${isHintOpen ? "bg-cyan-400/15 border-cyan-300/60" : ""}`}
            aria-expanded={isHintOpen}
            aria-label={`Показать подсказку: ${label}`}
            aria-controls={hintId}
          >
            ⓘ
          </button>
        )}
      </div>
      {hint && isHintOpen && (
        <div id={hintId} className="mb-2 rounded-xl border border-cyan-300/20 bg-neutral-950/95 px-3 py-2 text-xs leading-relaxed text-white/80 shadow-lg">
          {hint}
        </div>
      )}
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-white/10 bg-neutral-900/80 p-3 text-base"
      />
    </label>
  );
}
