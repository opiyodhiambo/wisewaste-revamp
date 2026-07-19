import { useState } from "react";
import { ChevronDown } from "lucide-react";



const benefits = [
  {
    title: "Expertise and Experience",
    content:
      "With years of hands-on experience in commercial and residential waste management, our team understands industry best practices and regulatory requirements. We deliver reliable solutions backed by proven operational expertise.",
  },
  {
    title: "Environmental Responsibility",
    content:
      "We are committed to sustainability, offering eco-friendly solutions that reduce waste, promote recycling, and minimize environmental impact. Businesses can trust us to help them meet their sustainability goals responsibly.",
  },
  {
    title: "Customized Solutions",
    content:
      "Every client’s needs are different. We tailor our waste collection, recycling, and disposal services to match your operational requirements, schedules, and waste volumes — ensuring maximum efficiency.",
  },
  {
    title: "Reliability and Efficiency",
    content:
      "Our services are delivered on time, every time. With well-maintained equipment, trained personnel, and responsive customer support, we ensure consistent service that businesses can depend on.",
  },
];

export default function KeyBenefits() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section className="mt-12">
      {/* Title */}
      <h2 className="text-xl font-extrabold text-slate-900">
        Key Benefits
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Why trust us for commercial garbage collection services:
      </p>

      {/* Green divider */}
      <div className="mt-3 h-[3px] w-full bg-[#1B6B1B]" />

      {/* Accordion */}
      <div className="mt-6 divide-y divide-slate-200 border-b border-slate-200">
        {benefits.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={item.title} className="py-5">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center border ${
                      isOpen
                        ? "bg-[#1B6B1B] text-white"
                        : "border-[#1B6B1B] text-[#1B6B1B]"
                    }`}
                  >
                    ↗
                  </span>

                  <span className="font-semibold text-slate-900">
                    {item.title}
                  </span>
                </div>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#1B6B1B]" : "text-slate-500"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-4 pl-9 max-w-3xl text-sm text-slate-600 leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}