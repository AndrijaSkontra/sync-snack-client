export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  if (diff < oneDay) return "Today";
  if (diff < 2 * oneDay) return "Yesterday";
  if (diff < 7 * oneDay) return "A-few-days-ago";
  if (diff < 14 * oneDay) return "Last-week";
  if (diff < 30 * oneDay) return "Last-month";
  if (diff < 90 * oneDay) return "More-than-a-month-ago";
  if (diff < 140 * oneDay) return "More-than-3-months-ago";
  if (diff < 365 * oneDay) return "More-than-6-months-ago";
  return "More-than-a-year-ago";
}

