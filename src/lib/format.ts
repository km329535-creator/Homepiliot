export function formatEok(value: number): string {
  const eok = Math.floor(value);
  const remainder = Math.round((value - eok) * 1000);
  if (remainder === 0) return `${eok}억`;
  return `${eok}억 ${remainder.toLocaleString()}만`;
}

export function formatRate(rate: number): string {
  const sign = rate > 0 ? "+" : "";
  return `${sign}${rate.toFixed(1)}%`;
}
