// Per-location summary for Admin → Location Pricing.
//
// A location has one price row per species *per size*, so the number of rows
// is not the number of species: a fish sold in three sizes is three rows.
// Custom-pricing auto-fill collapses to one line per species, so the species
// count here must be distinct species, or the two screens disagree.

export interface LocationSummary {
  location: string;
  /** Distinct species with at least one price at this location. */
  species: number;
  /** Price rows (species × size) at this location. */
  entries: number;
}

export function summarizeLocations(
  rows: { location: string; species_id: string }[],
): LocationSummary[] {
  const byLocation = new Map<string, { species: Set<string>; entries: number }>();
  for (const row of rows) {
    let s = byLocation.get(row.location);
    if (!s) {
      s = { species: new Set(), entries: 0 };
      byLocation.set(row.location, s);
    }
    s.species.add(row.species_id);
    s.entries += 1;
  }
  return [...byLocation.entries()]
    .map(([location, s]) => ({
      location,
      species: s.species.size,
      entries: s.entries,
    }))
    .sort((a, b) => a.location.localeCompare(b.location));
}
