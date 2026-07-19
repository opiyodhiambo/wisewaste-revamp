import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";

const items = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  label: `Gallery Item ${i + 1}`,
}));

export default function Gallery() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <section className="bg-slate-50 border-b border-slate-100">
        <Container className="py-12">
          <h1 className="text-3xl font-semibold">Gallery</h1>
          <p className="mt-3 text-slate-600">Replace these placeholders with your real images.</p>
        </Container>
      </section>

      <Container className="py-12">
        <SectionTitle kicker="Work snapshots" title="Recent work & service moments" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <div key={x.id} className="rounded-2xl border border-slate-100 bg-white shadow-soft overflow-hidden">
              <div className="aspect-[4/3] bg-slate-200" />
              <div className="p-4">
                <div className="font-medium">{x.label}</div>
                <div className="mt-1 text-sm text-slate-600">Replace with photo + caption.</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}