export function formatWon(amount: number, showSign: boolean = false): string {
  const formatted = Math.abs(amount).toLocaleString('ko-KR');
  if (showSign) {
    if (amount > 0) return `+₩${formatted}`;
    if (amount < 0) return `-₩${formatted}`;
  }
  return `₩${formatted}`;
}

export function formatDateLabel(dateString: string): string {
  const d = new Date(dateString);
  const now = new Date();
  
  const isToday = 
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = 
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate();

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[d.getMonth()];
  const day = d.getDate();

  if (isToday) return `Today, ${month} ${day}`;
  if (isYesterday) return `Yesterday, ${month} ${day}`;
  return `${month} ${day}, ${d.getFullYear()}`;
}

export function formatTime(dateString: string): string {
  const d = new Date(dateString);
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 hour is 12 AM
  return `${hours}:${minutes} ${ampm}`;
}

export function formatShortDateOrTime(dateString: string): string {
  const d = new Date(dateString);
  const now = new Date();
  const isToday = 
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = 
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate();

  const timeStr = formatTime(dateString);
  if (isToday) return timeStr;
  if (isYesterday) return `Yest, ${timeStr}`;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[d.getMonth()]} ${d.getDate()}`;
}
