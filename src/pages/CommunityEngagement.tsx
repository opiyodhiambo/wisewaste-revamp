import Container from "../components/ui/Container";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";

export default function CommunityEngagement() {
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-24 text-center">
        <div className="text-[11px] font-semibold tracking-wide" style={{ color: GREEN }}>
          Beyond Collection And Recovery
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold" style={{ color: DARK }}>
          Community Engagement
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: ORANGE }}>
          This page is a placeholder. Details on community programs and partnerships go here once
          that content is ready.
        </p>
      </Container>
    </section>
  );
}
