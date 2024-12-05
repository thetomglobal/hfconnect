import { FellowshipCenter } from '../types';

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function findNearestCenter(
  lat: number,
  lng: number,
  centers: FellowshipCenter[]
): FellowshipCenter {
  let nearestCenter = centers[0];
  let shortestDistance = getDistance(
    lat,
    lng,
    centers[0].location.lat,
    centers[0].location.lng
  );

  centers.forEach((center) => {
    const distance = getDistance(
      lat,
      lng,
      center.location.lat,
      center.location.lng
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestCenter = center;
    }
  });

  return nearestCenter;
}