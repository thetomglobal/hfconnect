import Fuse from 'fuse.js';
import { FellowshipCenter } from '../types';

export function findFellowshipByStreet(centers: FellowshipCenter[], street: string): FellowshipCenter | null {
  // Configure Fuse.js for fuzzy matching
  const options = {
    includeScore: true,
    threshold: 0.4, // Lower threshold for more lenient matching
    keys: ['streets'],
    minMatchCharLength: 3
  };

  // Create a searchable array of centers with their streets
  const searchableData = centers.map(center => ({
    ...center,
    streets: center.streets.join(' ').toLowerCase() // Combine all streets for better matching
  }));

  const fuse = new Fuse(searchableData, options);
  const results = fuse.search(street.toLowerCase());

  // Return the best match if found
  return results.length > 0 ? results[0].item : null;
}