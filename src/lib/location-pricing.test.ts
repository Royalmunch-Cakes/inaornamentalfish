import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { summarizeLocations } from "@/lib/location-pricing";

describe("summarizeLocations", () => {
  test("counts distinct species, not size rows", () => {
    const rows = [
      // Arowana in three sizes, Puffer in one → 2 species, 4 price entries
      { location: "Europe", species_id: "arowana" },
      { location: "Europe", species_id: "arowana" },
      { location: "Europe", species_id: "arowana" },
      { location: "Europe", species_id: "puffer" },
      { location: "Asia", species_id: "puffer" },
    ];
    assert.deepEqual(summarizeLocations(rows), [
      { location: "Asia", species: 1, entries: 1 },
      { location: "Europe", species: 2, entries: 4 },
    ]);
  });

  test("no rows → no locations", () => {
    assert.deepEqual(summarizeLocations([]), []);
  });
});
