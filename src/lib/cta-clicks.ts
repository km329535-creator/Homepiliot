import { getSupabaseClient, isSupabaseConfigured } from "./supabase";

const TABLE = "cta_clicks";

export async function recordCtaClick(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseClient();
  if (!supabase) return;

  const { error } = await supabase.from(TABLE).insert({});
  if (error) {
    console.error("Failed to record CTA click:", error.message);
  }
}

export async function getCtaClickCount(): Promise<number | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { count, error } = await supabase
    .from(TABLE)
    .select("*", { count: "exact", head: true });

  // 테이블이 아직 없거나 select 권한이 없으면 PostgREST가 에러 없이
  // count: null만 반환하는 경우가 있어, null도 "조회 실패"로 취급한다.
  if (error || count === null) {
    if (error) console.error("Failed to fetch CTA click count:", error.message);
    return null;
  }
  return count;
}

/** 다른 세션에서의 클릭도 실시간으로 반영하기 위한 구독. Supabase 미설정 시 아무 것도 하지 않는다. */
export function subscribeToCtaClicks(onInsert: () => void): () => void {
  const supabase = getSupabaseClient();
  if (!supabase) return () => {};

  const channel = supabase
    .channel("cta_clicks_changes")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: TABLE },
      () => onInsert()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
