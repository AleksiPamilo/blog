export default function createSlug(inputString: string, randomize: boolean = false) {
    const randomString = randomize ? '-' + Math.random().toString(36).substring(2, 7) : '';

    const slug = inputString
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-{2,}/g, '-');
    return `${slug}${randomString}`;
}