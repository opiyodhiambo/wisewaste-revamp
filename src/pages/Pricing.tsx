import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Custom",
    desc: "For small homes and light usage.",
    features: ["Weekly pickup option", "Basic sorting guidance", "Support via phone/WhatsApp"],
  },
  {
    name: "Business",
    price: "Custom",
    desc: "For SMEs with consistent waste volumes.",
    features: ["Scheduled pickups", "Commercial handling", "Priority support", "Flexible frequency"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large operations & specialized requirements.",
    features: ["Dedicated coordination", "Custom SLAs", "Special waste streams", "On-site assessments"],
  },
];

export default function Pricing() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <section className="bg-slate-50 border-b border-slate-100">
        <Container className="py-12">
          <h1 className="text-3xl font-semibold">Pricing</h1>
          <p className="mt-3 text-slate-600">
            Pricing varies by location, frequency, and service type. Use these as placeholder tiers.
          </p>
        </Container>
      </section>

      <Container className="py-12">
        <SectionTitle
          kicker="Plans"
          title="Choose a plan that fits your needs"
          desc="Replace plan names/prices later. The layout and CTA wiring is ready."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={[
                "rounded-2xl border bg-white shadow-soft p-6",
                p.highlight ? "border-slate-300" : "border-slate-100",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-lg">{p.name}</div>
                  <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
                </div>
                {p.highlight ? (
                  <span className="text-xs rounded-full bg-slate-900 text-white px-3 py-1">Popular</span>
                ) : null}
              </div>

              <div className="mt-6 text-3xl font-semibold">{p.price}</div>
              <div className="mt-1 text-sm text-slate-500">Quote-based</div>

              <ul className="mt-6 space-y-2 text-sm text-slate-700 list-disc pl-5">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3">
                <Link to="/request-pickup" className="flex-1">
                  <Button className="w-full">Request Pickup</Button>
                </Link>
                <Link to="/contact" className="flex-1">
                  <Button variant="ghost" className="w-full border border-slate-200">
                    Get Quote
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