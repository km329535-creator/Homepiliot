"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";
import type { PolicyStatus, RecommendedPolicy } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";
import { highlightNumbers } from "@/lib/highlight-text";

const STATUS_LABEL: Record<PolicyStatus, string> = {
  priority: "우선 검토",
  check_required: "조건 확인 필요",
  difficult: "현재 조건으로는 어려움",
};

const STATUS_TONE: Record<PolicyStatus, "positive" | "warning" | "negative"> = {
  priority: "positive",
  check_required: "warning",
  difficult: "negative",
};

export default function PolicyRecommendationCard({
  policy,
}: {
  policy: RecommendedPolicy;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <Badge tone={STATUS_TONE[policy.status]} size="md">{STATUS_LABEL[policy.status]}</Badge>
      <h3 className="mt-3 text-base font-semibold text-foreground">{policy.title}</h3>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-subtle-foreground">
        추천 이유
      </p>
      <ul className="mt-1.5 space-y-1.5">
        {policy.reasons.map((reason) => (
          <li key={reason} className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <span className="mt-0.5 text-accent">·</span>
            {highlightNumbers(reason)}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-subtle-foreground">
        확인 필요
      </p>
      <ul className="mt-1.5 space-y-1.5">
        {policy.checks.map((check) => (
          <li key={check} className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <span className="mt-0.5 text-warning">·</span>
            {highlightNumbers(check)}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        우리 부부의 다음 단계 보기
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      {open && (
        <div className="mt-3 rounded-xl bg-brand-50 p-3">
          <p className="flex items-start gap-1.5 text-sm leading-relaxed text-brand-800">
            <Lightbulb className="mt-0.5 h-4 w-4 flex-none" strokeWidth={1.75} aria-hidden />
            {highlightNumbers(policy.nextStep)}
          </p>
        </div>
      )}
    </div>
  );
}
