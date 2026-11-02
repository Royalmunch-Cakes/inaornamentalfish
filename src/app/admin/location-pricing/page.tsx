import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { fetchAllRows } from "@/lib/supabase/paginate";
import { summarizeLocations } from "@/lib/location-pricing";
import LocationPricingClient from "./LocationPricingClient";

export default async function LocationPricingPage() {
  const supabase = await createAdminSupabaseClient();
  const { data, error } = await fetchAllRows<{
    location: string;
    species_id: string;
  }>((from, to) =>
    supabase
      .from("location_pricing")
      .select("location, species_id")
      .order("id")
      .range(from, to),
  );
  // Surface failures via app/admin/error.tsx instead of an empty list.
  if (error) throw new Error(`Failed to load location pricing: ${error.message}`);

  return <LocationPricingClient initialLocations={summarizeLocations(data)} />;
}
