export const truncateWords = (text: string, maxWords: number): string => {
  const words = text.split(/\s+/);
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

export const truncateSmartMobileTitle = (text: string): string => {
  const words = text.split(/\s+/);

  if (words.length <= 2) return text;

  const threeWordsString = words.slice(0, 3).join(' ');

  // If the first 3 words combined are too long (> 16 chars), fall back to 2 words.
  if (threeWordsString.length > 16) {
    return words.slice(0, 2).join(' ') + '...';
  }

  // Otherwise, if there are more than 3 words, show 3 words + ...
  if (words.length > 3) {
    return threeWordsString + '...';
  }

  return text;
};
