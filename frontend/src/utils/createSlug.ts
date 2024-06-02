/**
 * Creates a slug from the given string, suitable for use in URLs.
 * @param inputString - The string to create the slug from.
 * @param addUniqueSuffix - Optional. If true, adds a unique numeric suffix to the slug (default is false).
 * @returns A slug generated from the input string.
 */
export default function createSlug(inputString: string, addUniqueSuffix: boolean = false) {
    const uniqueSuffix = addUniqueSuffix ? '-' + Math.floor(Math.random() * 100000).toString() : '';

    const slug = inputString
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '');
    return `${slug}${uniqueSuffix}`;
}

/**
 * Parses a post title from a slug.
 * @param slug - The slug to parse.
 * @returns An object containing the post title, user slug, and unique identifier, or null if the slug format is invalid.
 */
export function parsePostTitleFromSlug(slug: string) {
    const blogPostPattern = /^\/@([\w-]+)\/(.+)-(\d+)$/;
    const match = slug.match(blogPostPattern);

    if (match) {
        const userSlug = match[1];
        const postSlug = match[2].replace(/-/g, ' ');
        const uniqueIdentifier = match[3];

        return { postSlug, userSlug, uniqueIdentifier };
    } else {
        return null;
    }
}