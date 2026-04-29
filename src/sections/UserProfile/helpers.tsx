export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {year: "numeric", month: "long", day: "numeric",});
}
