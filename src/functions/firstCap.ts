export const firstCap = (text: string): string => {
  // Capitalizens the first letter and lowecases the rest
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
