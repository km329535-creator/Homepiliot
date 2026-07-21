"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getCtaClickCount, subscribeToCtaClicks } from "@/lib/cta-clicks";

export default function CtaCountBadge({
  initialCount,
}: {
  initialCount: number | null;
}) {
  const [count, setCount] = useState<number | null>(initialCount);

  useEffect(() => {
    let mounted = true;

    // 서버에서 이미 초기값을 받아왔다면 재요청하지 않고 실시간 구독만 연결한다.
    if (initialCount === null) {
      getCtaClickCount().then((value) => {
        if (mounted) setCount(value);
      });
    }

    const unsubscribe = subscribeToCtaClicks(() => {
      setCount((prev) => (prev !== null ? prev + 1 : prev));
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Badge tone="accent" size="md" className="mb-5">
      {count !== null
        ? `${count.toLocaleString()}명의 사용자가 이용했어요`
        : "예비 부부를 위한 로드맵 설계"}
    </Badge>
  );
}
