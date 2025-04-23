/* eslint-disable no-console */
export function formatedDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function parseCoordinates(input) {
  const regex = /^\[?([-+]?[0-9]*\.?[0-9]+),\s*([-+]?[0-9]*\.?[0-9]+)\]?$/;
  const match = input.match(regex);
  if (!match) {
    throw new Error('Invalid format');
  }
  return {
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2]),
  };
}
