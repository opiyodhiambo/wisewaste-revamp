import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Container from "../components/ui/Container";
import { blogPosts } from "../data/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Container className="py-16">
        <div className="font-semibold text-xl">Post not found</div>
        <Link to="/blog" className="text-slate-700 hover:text-slate-900">Back to Blog</Link>
      </Container>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <section className="bg-slate-50 border-b border-slate-100">
        <Container className="py-12">
          <div className="text-xs text-slate-600">{post.tags.join(", ")}</div>
          <h1 className="mt-2 text-3xl font-semibold">{post.title}</h1>
          <div className="mt-2 text-sm text-slate-500">{post.date}</div>
        </Container>
      </section>

      <Container className="py-12 prose max-w-3xl">
        {post.content.map((p, i) => {
          if (typeof p === "string") {
            return (
              <p key={i} className="text-slate-700">
                {p}
              </p>
            );
          } else {
            // p is an object like { heading?: string; paragraphs: string[] }
            return (
              <div key={i}>
                {p.heading && <h2 className="text-xl font-semibold mt-6">{p.heading}</h2>}
                {p.paragraphs.map((para, j) => (
                  <p key={`${i}-${j}`} className="text-slate-700">
                    {para}
                  </p>
                ))}
              </div>
            );
          }
        })}
      </Container>
    </motion.div>
  );
}