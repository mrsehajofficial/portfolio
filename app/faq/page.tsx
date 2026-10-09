import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import { FAQS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions: Who is Sehaj Varma? What does he build?",
  description:
    "Plain answers about who Sehaj Varma is, his tech stack, the Aegis and Amai Yuki projects, the RAG pipeline, and how to hire him for AI automation, Python backends, and freelance work.",
  alternates: { canonical: `${SITE_URL}faq` },
  openGraph: {
    type: "website",
    title: "Questions: Who is Sehaj Varma? What does he build?",
    description:
      "Plain answers about who Sehaj Varma is, his tech stack, the Aegis and Amai Yuki projects, the RAG pipeline, and how to hire him.",
    url: `${SITE_URL}faq`,
    images: [
      {
        url: "/og-image-v3.png",
        width: 1200,
        height: 630,
        alt: "Sehaj Varma — AI Automation Engineer & Backend Developer Portfolio Banner",
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}faq`,
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">Questions</p>
            <h1 className="page-title">
              Asked often, <em>answered plainly.</em>
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              Short, factual answers about who I am, what I build, and how to
              work with me. Everything here is something I&apos;d say over a
              call — <b>no canned lines.</b>
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="faq">
                {FAQS.map(({ question, answer }, i) => (
                  <div className="faq-item" key={question}>
                    <div className="faq-head" style={{ cursor: "default" }}>
                      <span className="faq-q">{question}</span>
                    </div>
                    <p className="faq-a" style={{ paddingTop: 0 }}>{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Footer />
    </>
  );
}
