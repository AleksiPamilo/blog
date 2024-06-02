import sanitize from "sanitize-html";

/**
 * Strips HTML tags from a string.
 * @param html - The HTML string to strip tags from.
 * @returns The plain text content.
 */
function stripHtml(html: string): string {
    const cleanHtml = sanitize(html, {
        allowedTags: [],
        allowedAttributes: {}
    });
    return cleanHtml;
}

/**
 * Estimates the reading time for a given text.
 * @param text - The text to estimate reading time for.
 * @param wordsPerMinute - The average reading speed (default is 200 words per minute).
 * @returns The estimated reading time in minutes.
 */
function estimateReadingTime(text: string, wordsPerMinute: number = 200): number {
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

/**
 * Estimates the reading time for a given HTML content.
 * @param html - The HTML content to estimate reading time for.
 * @param wordsPerMinute - The average reading speed (default is 200 words per minute).
 * @returns The estimated reading time in minutes.
 */
function estimateReadingTimeFromHtml(html: string, wordsPerMinute: number = 200): number {
    const text = stripHtml(html);
    return estimateReadingTime(text, wordsPerMinute);
}

export { estimateReadingTime, estimateReadingTimeFromHtml };