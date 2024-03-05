import { Product } from '../../misc/types';

export function sortData(data: Product[] | undefined, sortBy: string) {
  if (!data) return [];

  if (sortBy === 'lowToHigh') {
    return [...data].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'highToLow') {
    return [...data].sort((a, b) => b.price - a.price);
  } else {
    return data;
  }
}

export function convertImagesArray(inputArray: string[]): string[] {
  return inputArray
    .map((str) => {
      // Check if the string starts with '[' and ends with ']'
      const hasSquareBrackets = str.startsWith('[') && str.endsWith(']');

      if (hasSquareBrackets) {
        const parsedArray = JSON.parse(str);

        if (Array.isArray(parsedArray)) {
          // If it's a valid JSON array, return the array after removing double quotes
          return parsedArray.map((url) =>
            typeof url === 'string' ? url.replace(/"/g, '') : '',
          );
        }
      }

      // If not a JSON array or parsing failed, treat as a plain URL and remove square brackets
      return str.replace(/[\[\]"]/g, '');
    })
    .flat(); // Use flat() to flatten the resulting array
}
