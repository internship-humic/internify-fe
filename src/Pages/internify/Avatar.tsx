export default function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0 bg-primary">
      {initials}
    </div>
  );
}