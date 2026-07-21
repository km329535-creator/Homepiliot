import type { ReactNode } from "react";

const NUMBER_PATTERN =
  /(\d[\d,]*(?:\.\d+)?\s?(?:억원|만원|원|점|개월|년|단계|건|명|%))/;
const DELTA_PATTERN = /(\([+-]\d+\))/;

export type HighlightTone = "accent" | "positive" | "warning" | "negative" | "neutral";

const TONE_CLASS: Record<HighlightTone, string> = {
  accent: "text-accent",
  positive: "text-positive",
  warning: "text-warning",
  negative: "text-negative",
  neutral: "text-foreground",
};

/**
 * 문장 속 금액/점수/기간 등 핵심 수치를 강조 색상으로 표시한다.
 * "(+30)" / "(-24)" 같은 증감 표기는 tone과 무관하게 항상 긍/부정 색으로 구분한다.
 */
export function highlightNumbers(
  text: string,
  tone: HighlightTone = "accent"
): ReactNode {
  const toneClass = TONE_CLASS[tone];

  return text.split(DELTA_PATTERN).map((chunk, ci) => {
    if (ci % 2 === 1) {
      const isPositive = chunk.startsWith("(+");
      return (
        <strong
          key={`d-${ci}`}
          className={`whitespace-nowrap font-bold ${isPositive ? "text-positive" : "text-negative"}`}
        >
          {chunk}
        </strong>
      );
    }

    return chunk.split(NUMBER_PATTERN).map((part, i) =>
      i % 2 === 1 ? (
        <strong key={`${ci}-${i}`} className={`whitespace-nowrap font-bold ${toneClass}`}>
          {part}
        </strong>
      ) : (
        part
      )
    );
  });
}
