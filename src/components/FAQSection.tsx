import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  <Accordion type="single" collapsible className="w-full">
    {items.map((item, i) => (
      <AccordionItem key={i} value={`faq-${i}`}>
        <AccordionTrigger className="text-left font-semibold">
          {item.question}
        </AccordionTrigger>
        <AccordionContent className="text-foreground/80">
          <div
            className="prose prose-sm max-w-none [&_strong]:text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: item.answer.replace(/\s*---\s*$/, "").trim(),
            }}
          />
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default FAQSection;
