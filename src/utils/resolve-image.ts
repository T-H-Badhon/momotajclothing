/** Returns a fully-qualified image URL.
 *  If the stored value is already an absolute URL (http/https) it is used
 *  as-is; otherwise the NEXT_PUBLIC_MEDIA base URL is prepended.
 */
export function resolveImage(path: string | undefined | null): string {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
        return path;
    }
    return (process.env.NEXT_PUBLIC_MEDIA ?? '') + path;
}
