import type { ReactNode } from "react";

const NUMBER_PATTERN =
  /(\d[\d,]*(?:\.\d+)?\s?(?:억원|만원|원|점|개월|년|단계|건|명|%))/;

/** 문장 속 금액/점수/기간 등 핵심 수치를 강조 색상으로 표시한다. */
export function highlightNumbers(text: string): ReactNode {
  const parts = text.split(NUMBER_PATTERN);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="whitespace-nowrap font-bold text-accent">
        {part}
      </strong>
    ) : (
      part
    )
  );
}
