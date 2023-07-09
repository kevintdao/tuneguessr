const re = /\w/gi;

export function hideAnswer(answer: string): string {
  return answer.replace(re, "_");
}
