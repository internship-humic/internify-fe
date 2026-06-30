interface ProgressBarProps {
  value: number;
  total: number;
}

export default function ProgressBar({ value, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  const isComplete = value === total;

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isComplete ? "bg-[#B30000]" : "bg-gray-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs font-bold ${isComplete ? "text-[#B30000]" : "text-gray-500"}`}>
        {value}/{total}
      </span>
    </div>
  );
}