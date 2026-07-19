import { getSupabaseClient, isSupabaseConfigured } from "./supabase";

export type SubmitFeedbackResult = { ok: true } | { ok: false; reason: string };

export async function submitFeedback(message: string): Promise<SubmitFeedbackResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, reason: "not_configured" };
  }

  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, reason: "not_configured" };

  const { error } = await supabase.from("feedback").insert({
    message,
    page_url: typeof window !== "undefined" ? window.location.href : null,
  });

  if (error) {
    console.error("Failed to submit feedback:", error.message);
    return { ok: false, reason: "insert_failed" };
  }

  return { ok: true };
}
