import Container from "../ui/Container";
import { blogPosts } from "../../data/blog";
import { Link } from "react-router-dom";

export default function BlogPreview() {
  return (
    <section className="bg-white">
      <Container className="py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm text-slate-600">Recent News And Articles</div>
            <h2 className="mt-2 text-2xl font-semibold">Latest from our blog</h2>
          </div>
          <Link to="/blog" className="text-sm text-slate-700 hover:text-slate-900">Check All Blog Posts</Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((p) => (
            <Link
              to={`/blog/${p.slug}`}
              key={p.slug}
              className="rounded-2xl border border-slate-100 bg-white shadow-soft p-5 hover:border-slate-200 transition"
            >
              <div className="text-xs text-slate-600">{p.tags.join(", ")}</div>
              <div className="mt-2 font-semibold">{p.title}</div>
              <div className="mt-2 text-sm text-slate-600">{p.excerpt}</div>
              <div className="mt-4 text-xs text-slate-500">{p.date}</div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}