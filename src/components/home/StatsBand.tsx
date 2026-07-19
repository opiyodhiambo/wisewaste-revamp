import Container from "../ui/Container";

export default function StatsBand() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <Container className="py-10 grid gap-4 md:grid-cols-3">
        {[
          { k: "99.9%", v: "Customer satisfaction" },
          { k: "15,000+", v: "Clients served" },
          { k: "200+", v: "Professional staff" },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-100 p-6 shadow-soft">
            <div className="text-3xl font-semibold">{x.k}</div>
            <div className="mt-2 text-slate-600">{x.v}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}