const CDN_IMAGE_DOMAIN = process.env.REACT_APP_CDN_IMAGE_DOMAIN;
const IMAGE_ORIGIN = process.env.REACT_APP_IMAGE_ORIGIN;
interface options {
  width: number;
  height: number;
  quality?: number;
}
export default function optimizeImage(
  url: string | undefined,
  resizeOptions?: options,
  isSmallAvatar?: boolean
): string {
  if (!url) return "";
  if (url.startsWith("http:")) {
    if (isSmallAvatar && url.endsWith("640.jpg")) {
      return "https:" + url.slice(5, -11) + "110x110.jpg";
    }
    return "https:" + url.slice(5);
  }

  if (!url.startsWith(IMAGE_ORIGIN!)) return url;
  if (url.endsWith(".svg")) return url;

  // Cloudfront
  let replaced = CDN_IMAGE_DOMAIN + url.slice(IMAGE_ORIGIN.length);
  if (!resizeOptions) {
    return replaced;
  }
  const { width, height, quality } = resizeOptions;
  return replaced.concat(`?w=${width}&h=${height}&q=${quality || 80}`);
}
