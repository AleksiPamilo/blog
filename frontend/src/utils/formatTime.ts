/**
 * Returns a human-readable string representing the time elapsed since the given date.
 * @param date - The date to compare to the current time.
 * @returns A string indicating how long ago the date was.
 */
export const timeAgo = (date: string) => {
  const time = new Date(date).valueOf();

  const timeAgo = Date.now() - time;
  const seconds = Math.floor(timeAgo / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (days < 30) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  } else {
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }
};

/**
 * Formats a date string into a locale-specific string representation including date and time.
 * @param date - The date string to format.
 * @returns A formatted string representing the date and time.
 */
export const formatTime = (date: string) => {
  return new Date(date).toLocaleString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formats a date string into the format DD.MM.YYYY.
 * @param date - The date string to format.
 * @returns A string representing the formatted date.
 */
export const formatDDMMYYYY = (date: string) => {
  const time = new Date(date);
  const currentDate = time.getDate();
  const currrentMonth = time.getMonth() + 1;
  const currentYear = time.getFullYear();

  return currentDate + "." + currrentMonth + "." + currentYear;
};
