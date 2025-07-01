export function yearsSince(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString
    }
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
  
    const msInYear = 1000 * 60 * 60 * 24 * 365;
    return String(Math.floor(diffInMs / msInYear));
}