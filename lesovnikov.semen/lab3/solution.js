export function sortByFrequency(arr) {
  const frequencies = new Map();

  for (const item of arr) {
    frequencies.set(item, (frequencies.get(item) || 0) + 1);
  }

  return [...arr].sort((a, b) => frequencies.get(b) - frequencies.get(a));
}
