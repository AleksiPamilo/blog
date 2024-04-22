export default function createSlug(inputString: string, randomize: boolean = false) {
    const randomString = randomize ? '-' + Math.random().toString(36).substring(2, 7) : '';

    const slug = inputString
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-{2,}/g, '-');
    return `${slug}${randomString}`;
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