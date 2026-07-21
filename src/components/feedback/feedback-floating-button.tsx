"use client";

import { MessageCircle } from "lucide-react";
import { useFeedback } from "@/lib/feedback-context";

export default function FeedbackFloatingButton() {
  const { open } = useFeedback();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="의견 보내기"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-brand-700 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
