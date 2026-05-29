interface HeroProps {
    title: string,
    description: string
}

export default function HeroProject({ title, description }: HeroProps) {
  return (
    <div className="relative overflow-hidden rounded-xl px-8 py-7 mb-7 bg-gradient-to-br from-[#8B1A1A] via-[#C0392B] to-[#6B1414]">
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
      <div className="absolute -bottom-5 right-16 w-20 h-20 rounded-full bg-white/[0.07]" />

      <h2 className="mb-3 font-extrabold text-xl text-white tracking-[0.3px]">
        {title.toUpperCase()}
      </h2>
      {description.split('\n\n').map((para, i) => (
        <p
          key={i}
          className={`text-[13px] text-white/85 leading-[1.65] ${i === 0 ? 'mb-2.5' : 'mb-0'}`}
        >
          {para}
        </p>
      ))}
    </div>
  );
}