import FadeInUp from "../../../animations/FadeInUp";

export default function SectionTitle({ badge, title, highlight, subtitle, center = true }) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      {badge && (
        <FadeInUp delay={0}>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
            {badge}
          </span>
        </FadeInUp>
      )}
      <FadeInUp delay={0.1}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-[#FFF7ED] leading-tight">
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h2>
      </FadeInUp>
      {subtitle && (
        <FadeInUp delay={0.2}>
          <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </FadeInUp>
      )}
    </div>
  );
}
