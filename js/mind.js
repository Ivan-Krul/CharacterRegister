
export function getMindDate(date = new Date()) {
  const beginning = new Date("2006-02-04T09:15:20Z");

  const diff_ms = (date - beginning) * 1.0003;

  return new Date(new Date("2000-01-01").getTime() + diff_ms);
}