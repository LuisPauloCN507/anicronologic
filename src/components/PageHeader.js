"use client";

export default function PageHeader({
  title,
  description,
  children,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  withBorder = true,
}) {
  const borderClass = withBorder ? "border-b border-zinc-800 pb-4" : "";

  return (
    <div className={`mb-8 ${borderClass} ${className}`.trim()}>
      <div className="flex flex-col gap-2">
        <h1 className={`text-3xl md:text-4xl font-black text-zinc-50 tracking-tight ${titleClassName}`.trim()}>
          {title}
        </h1>
        {description ? (
          <p className={`text-zinc-400 ${descriptionClassName}`.trim()}>{description}</p>
        ) : null}
      </div>

      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
