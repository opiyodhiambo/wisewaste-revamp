const chips = [
  { title: "Reliable & Trustworthy" },
  { title: "Efficient & Low Cost" },
  { title: "Ensure Satisfaction" },
  { title: "Green Economy" },
  { title: "Certified Garbage Collectors" },
  { title: "Sustainable Management" },
];

export default function FeatureChips() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {chips.map((c) => (
        <div key={c.title} className="rounded-2xl border border-slate-100 p-4 bg-white shadow-soft">
          <div className="font-medium">{c.title}</div>
        </div>
      ))}
    </div>
  );
}