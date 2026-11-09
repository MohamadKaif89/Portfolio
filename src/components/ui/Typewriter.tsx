import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery.ts";

type TypewriterProps = {
  words: string[];
};

/**
 * Types and deletes a list of role titles. Reduced motion shows the first word and stops.
 *
 * @example
 * <Typewriter words={portfolio.roles} />
 */
export function Typewriter({ words }: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (reduced || words.length === 0) return;
    const word = words[index] ?? "";
    const delay = phase === "holding" ? 1400 : phase === "deleting" ? 42 : 88;

    const timeout = window.setTimeout(() => {
      if (phase === "typing") {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setPhase("holding");
        return;
      }
      if (phase === "holding") {
        setPhase("deleting");
        return;
      }
      const next = word.slice(0, Math.max(0, text.length - 1));
      setText(next);
      if (next.length === 0) {
        setPhase("typing");
        setIndex((current) => (current + 1) % words.length);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [index, phase, reduced, text, words]);

  const spoken = words[0] ?? "";
  const visible = reduced ? spoken : text;

  return (
    <span>
      <span className="sr-only">{spoken}</span>
      <span aria-hidden="true">
        {visible}
        <span className="ml-1 inline-block w-[2px] translate-y-1 animate-caret bg-accent text-transparent motion-reduce:animate-none">
          |
        </span>
      </span>
    </span>
  );
}
