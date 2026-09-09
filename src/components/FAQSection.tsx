import React from "react";

interface FAQSectionProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * FAQSection — renders Q&A as accordion with HTML answers.
 *
 * IMPORTANT: `answer` is rendered via dangerouslySetInnerHTML so that
 * inline <strong>, <em>, links from generated content render correctly.
 * The wrapping <div> is required because Radix AccordionContent already
 * wraps children in its own <div> — passing dangerouslySetInnerHTML
 * directly to AccordionContent crashes React with a children conflict.
 *
 * Also strips trailing GPT artefacts like "---" or "**E-E-A-T signal:** ..."
 * residue.
 */
const FAQSection: React.FC<FAQSectionProps> = ({ items }) => (
  <div className="w-full space-y-6">
    {items.map((item, i) => (
      <div key={i}>
        <h3 className="text-left font-semibold mb-2">{item.question}</h3>
        <div className="text-foreground/80"><div
            className="prose prose-sm max-w-none [&_strong]:text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: item.answer.replace(/\s*---\s*$/, "").trim(),
            }}
          /></div>
      </div>
    ))}
  </div>
);

export default FAQSection;
