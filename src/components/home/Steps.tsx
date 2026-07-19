import Container from "../ui/Container";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const steps = [
  { n: 1, t: "Provide Us With The Details", d: "Share your needs and location to get started." },
  { n: 2, t: "Pick The Suitable Plan For You", d: "Choose a plan that fits your home or business." },
  { n: 3, t: "Online Scheduling In Few Clicks", d: "Schedule pickup quickly and conveniently." },
  { n: 4, t: "We Collect Waste & Leave Quickly", d: "Fast, safe and reliable collection." },
];

export default function Steps() {
  return (
    <section className="bg-slate-50">
      <Container className="py-14">
        <div className="max-w-2xl">
          <div className="text-sm text-slate-600">See How It Works</div>
          <h2 className="mt-2 text-2xl font-semibold">Easy Steps For A Clean And Healthy Environment!</h2>
          <p className="mt-3 text-slate-600">
            We do garbage sorting and recycling to promote a healthier living environment.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-soft">
              <div className="text-sm text-slate-600">Step {s.n}</div>
              <div className="mt-1 font-semibold">{s.t}</div>
              <div className="mt-2 text-sm text-slate-600">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/request-pickup">
            <Button>Request Pickup</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}