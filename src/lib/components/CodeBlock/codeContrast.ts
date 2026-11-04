type RGB = [number, number, number];

function rgb(color: string): RGB | null {
  if (/^#[0-9a-f]{6}$/i.test(color)) return [1, 3, 5].map(index => parseInt(color.slice(index, index + 2), 16)) as RGB;
  const match = color.match(/^hsla?\(\s*([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%/i);
  if (!match) return null;
  const h = Number(match[1]) / 360;
  const s = Number(match[2]) / 100;
  const l = Number(match[3]) / 100;
  const hue = (n: number) => {
    const k = (n + h * 12) % 12;
    return 255 * (l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1)));
  };
  return [hue(0), hue(8), hue(4)];
}
function luminance(color: RGB): number {
  return color.reduce((total, channel, index) => {
    const value = channel / 255;
    return total + (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4) * [0.2126, 0.7152, 0.0722][index];
  }, 0);
}
function ratio(a: RGB, b: RGB): number {
  const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (high + 0.05) / (low + 0.05);
}
/** Preserve each syntax hue, adjusting brightness for readable normal-size text. */
export function ensureCodeContrast(color: string, background: string): string {
  const foreground = rgb(color);
  const backdrop = rgb(background);
  if (!foreground || !backdrop || ratio(foreground, backdrop) >= 4.6) return color;
  const destination = luminance(backdrop) > 0.179 ? 0 : 255;
  for (let amount = 0.02; amount <= 1; amount += 0.02) {
    const adjusted = foreground.map(channel => Math.round(channel + (destination - channel) * amount)) as RGB;
    if (ratio(adjusted, backdrop) >= 4.6) return `rgb(${adjusted.join(", ")})`;
  }
  return destination === 0 ? "#000000" : "#ffffff";
}
