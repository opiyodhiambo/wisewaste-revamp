import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import SectionBackdrop from "../components/ui/SectionBackdrop";
import { site } from "../data/site";

const roles = [
  { title: "Operations Assistant", type: "Full-time", location: "Nairobi", desc: "Support scheduling and coordination (placeholder)." },
  { title: "Field Service Team Member", type: "Full-time", location: "Nairobi/Mombasa", desc: "Service delivery and customer support (placeholder)." },
  { title: "Sales Representative", type: "Contract", location: "Remote", desc: "Client onboarding and relationship management (placeholder)." },
];

export default function Careers() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Career Application")}&body=${encodeURIComponent(
    "Hi Flash Services,\n\nI would like to apply for:\nRole: \nLocation: \n\nMy details:\nName:\nPhone:\n\nAttached: CV\n\nThanks."
  )}`;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
        <SectionBackdrop />
        <Container className="relative py-12">
          <h1 className="text-3xl font-semibold">Careers</h1>
          <p className="mt-3 text-slate-600">Join the team (placeholder listings for the clone).</p>
        </Container>
      </section>

      <Container className="py-12">
        <SectionTitle kicker="Open roles" title="Build a greener future with us" />

        <div className="mt-8 grid gap-4">
          {roles.map((r) => (
            <div key={r.title} className="rounded-2xl border border-slate-100 bg-white shadow-soft p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="font-semibold text-lg">{r.title}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    {r.type} • {r.location}
                  </div>
                  <div className="mt-3 text-sm text-slate-600">{r.desc}</div>
                </div>

                <a href={mailto}>
                  <Button>Apply via Email</Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-100 bg-white shadow-soft p-6">
          <div className="font-semibold">Didn’t see a match?</div>
          <p className="mt-2 text-sm text-slate-600">
            Send your CV and we’ll reach out when something fits.
          </p>
          <a className="mt-4 inline-block" href={mailto}>
            <Button variant="ghost" className="border border-slate-200">Send General Application</Button>
          </a>
        </div>
      </Container>
    </motion.div>
  );
}