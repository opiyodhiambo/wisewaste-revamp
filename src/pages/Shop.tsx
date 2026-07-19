import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";

const products = [
  { name: "Sanitary Bin Service", price: "Request Quote", desc: "Washroom hygiene servicing (placeholder)." },
  { name: "Cleaning Bundle", price: "Request Quote", desc: "Routine cleaning package (placeholder)." },
  { name: "Recycling Starter Kit", price: "Request Quote", desc: "Sorting + pickup plan (placeholder)." },
];

export default function Shop() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <section className="bg-slate-50 border-b border-slate-100">
        <Container className="py-12">
          <h1 className="text-3xl font-semibold">Shop</h1>
          <p className="mt-3 text-slate-600">Placeholder storefront (wire payments later if needed).</p>
        </Container>
      </section>

      <Container className="py-12">
        <SectionTitle kicker="Products" title="Featured items" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="rounded-2xl border border-slate-100 bg-white shadow-soft p-6">
              <div className="aspect-[4/3] rounded-xl bg-slate-200" />
              <div className="mt-4 font-semibold">{p.name}</div>
              <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
              <div className="mt-4 text-lg font-semibold">{p.price}</div>
              <div className="mt-5">
                <Button className="w-full">Inquire</Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}