const kEarthRadius = 6371010;
const kMaxLatitude = Math.PI / 2; // 90 degrees
const kMinLatitude = -kMaxLatitude; // -90 degrees
const kMaxLongitude = Math.PI; // 180 degrees
const kMinLongitude = -kMaxLongitude; // -180 degrees

const deg2rad = (degress: number) => degress * Math.PI / 180;
const rad2deg = (radians: number) => radians * 180 / Math.PI;

/**
 * This code is derived from the Java code originally published at
 * http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates
 */
export const bbox = (latitude: number, longitude: number, meters: number): {
  minlat: number,
  maxlat: number,
  minlon: number,
  maxlon: number,
}  => {
  const dist = meters / kEarthRadius;
  let minlat = deg2rad(latitude) - dist;
  let maxlat = deg2rad(latitude) + dist;
  let minlon = 0;
  let maxlon = 0;

  if (minlat > kMinLatitude && maxlat < kMaxLatitude) {
    const delta = Math.asin(Math.sin(dist) / Math.cos(deg2rad(latitude)));
    minlon = deg2rad(longitude) - delta;
    if (minlon < kMinLongitude) {
      minlon += Math.PI * 2;
    }
    
    maxlon = deg2rad(longitude) + delta;
    if (maxlon > kMaxLongitude) {
      maxlon -= Math.PI * 2;
    }
  } else {
    minlat = Math.max(minlat, kMinLatitude);
    maxlat = Math.min(maxlat, kMaxLatitude);
    minlon = kMinLongitude;
    maxlon = kMaxLongitude;
  }

  return {
    minlat: rad2deg(minlat),
    maxlat: rad2deg(maxlat),
    minlon: rad2deg(minlon),
    maxlon: rad2deg(maxlon),
  };
};
