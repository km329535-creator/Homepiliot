"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getCtaClickCount, subscribeToCtaClicks } from "@/lib/cta-clicks";

export default function CtaCountBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    getCtaClickCount().then((value) => {
      if (mounted) setCount(value);
    });

    const unsubscribe = subscribeToCtaClicks(() => {
      setCount((prev) => (prev !== null ? prev + 1 : prev));
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <Badge tone="accent" size="md" className="mb-5">
      {count !== null
        ? `${count.toLocaleString()}명의 사용자가 이용했어요`
        : "예비 부부를 위한 로드맵 설계"}
    </Badge>
  );
}
