import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import SectionBackdrop from "../components/ui/SectionBackdrop";
import { Link } from "react-router-dom";

const cases = [
  {
    title: "Retail Store Waste Optimization",
    industry: "Retail",
    result: "Improved pickup reliability and sorting compliance (placeholder).",
  },
  {
    title: "Office Washroom Hygiene Rollout",
    industry: "Corporate",
    result: "Standardized hygiene servicing schedule across floors (placeholder).",
  },
  {
    title: "Residential Estate Scheduled Collection",
    industry: "Residential",
    result: "Consistent weekly collection with recycling awareness (placeholder).",
  },
];

export default function CaseStudies() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
        <SectionBackdrop />
        <Container className="relative py-12">
          <h1 className="text-3xl font-semibold">Case Studies</h1>
          <p className="mt-3 text-slate-600">Real-world examples (placeholder content for the clone).</p>
        </Container>
      </section>

      <Container className="py-12">
        <SectionTitle
          kicker="Impact"
          title="Results that matter"
          desc="Replace with real client stories and images later."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-100 bg-white shadow-soft p-6">
              <div className="text-xs text-slate-600">{c.industry}</div>
              <div className="mt-2 font-semibold">{c.title}</div>
              <p className="mt-3 text-sm text-slate-600">{c.result}</p>

              <div className="mt-6 flex gap-3">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full">Request Similar</Button>
                </Link>
                <Link to="/services" className="flex-1">
                  <Button variant="ghost" className="w-full border border-slate-200">
                    Services
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