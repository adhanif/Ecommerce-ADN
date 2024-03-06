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
      const hasSquareBrackets = str.startsWith('[') && str.endsWith(']');

      if (hasSquareBrackets) {
        const parsedArray = JSON.parse(str);

        if (Array.isArray(parsedArray)) {
          return parsedArray.map((url) =>
            typeof url === 'string' ? url.replace(/"/g, '') : '',
          );
        }
      }

      return str.replace(/[\[\]"]/g, '');
    })
    .flat(); // Use flat() to flatten the resulting array
}
