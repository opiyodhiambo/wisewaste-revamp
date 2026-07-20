import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import SectionBackdrop from "../components/ui/SectionBackdrop";
import { Link } from "react-router-dom";

const offers = [
  {
    title: "First Pickup Discount",
    desc: "New customers get a discounted first pickup (placeholder offer).",
    tag: "New",
  },
  {
    title: "Monthly Cleaning Bundle",
    desc: "Combine cleaning + waste collection for better value (placeholder).",
    tag: "Bundle",
  },
  {
    title: "Office Hygiene Starter Pack",
    desc: "Sanitary bins + refill schedule for washrooms (placeholder).",
    tag: "Hygiene",
  },
];

export default function Offers() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
        <SectionBackdrop />
        <Container className="relative py-12">
          <h1 className="text-3xl font-semibold">Offers</h1>
          <p className="mt-3 text-slate-600">Promos and bundles (placeholder content for the clone).</p>
        </Container>
      </section>

      <Container className="py-12">
        <SectionTitle
          kicker="Promotions"
          title="Special offers tailored to your needs"
          desc="Replace these with the real offers later. Layout + CTAs are ready."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <div key={o.title} className="rounded-2xl border border-slate-100 bg-white shadow-soft p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">{o.title}</div>
                <span className="text-xs rounded-full bg-slate-100 px-3 py-1">{o.tag}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{o.desc}</p>
              <div className="mt-6 flex gap-3">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full">Get Offer</Button>
                </Link>
                <Link to="/services" className="flex-1">
                  <Button variant="ghost" className="w-full border border-slate-200">
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}