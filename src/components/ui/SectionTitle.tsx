export default function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? <div className="text-sm text-slate-600">{kicker}</div> : null}
      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
      {desc ? <p className="mt-3 text-slate-600">{desc}</p> : null}
    </div>
  );
}