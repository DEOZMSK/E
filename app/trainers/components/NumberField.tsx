interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function NumberField({ label, value, onChange, className }: NumberFieldProps) {
  return (
    <label className={className}>
      <span className="text-sm text-neutral-200">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-900/80 p-3 text-base"
      />
    </label>
  );
}
