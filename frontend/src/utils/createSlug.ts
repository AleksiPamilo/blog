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