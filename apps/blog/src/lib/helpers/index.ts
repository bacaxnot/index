/**
 * Formats a date string to a more readable format.
 * @param date - Date string to be formatted.
 * @returns - Formatted date string.
 * @example
 * const date = '2021-01-01T00:00:00.000Z';
 * const formattedDate = dateFormatter(date);
 * console.log(formattedDate); // 1/1/2021
 */
export function dateFormatter(date: string) {
	const dateObj = new Date(date)
	const day = dateObj.getDate()
	const month = dateObj.getMonth() + 1
	const year = dateObj.getFullYear()
	return `${day}/${month}/${year}`
}

/**
 * Extracts the first 200 characters of a string and returns it.
 * @param content - String to be excerpted.
 * @returns - Excerpted string.
 * @example
 * ```
 * const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis aliquet nisl nunc quis nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis aliquet nisl nunc quis nisl.';
 * const excerpt = contentExcerpt(content);
 * console.log(excerpt); // Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis aliquet nisl nunc quis nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis aliquet nisl nunc quis nisl.
 * ```
 */
export function contentExcerpt(content: string) {
	const excerpt = content.slice(0, 180)
	return excerpt
}
