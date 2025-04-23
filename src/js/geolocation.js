// eslint-disable-next-line import/prefer-default-export
export function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(coords);
      }, () => {
        reject();
      });
    } else {
      reject();
    }
  });
}
