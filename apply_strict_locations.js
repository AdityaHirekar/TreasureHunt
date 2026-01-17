const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: "./.env" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_KEY in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const locations = [
    { code: 'CLG', name: 'College', hint: 'Starting Point', lat: 18.92368888207889, lng: 72.83244098149588 },
    { code: 'RADIO_CLUB', name: 'Radio Club', hint: 'I stand at the edge where land meets tide,\nWatching yachts whisper as they glide.\nHistory behind me, waves ahead —\nFind the place where sea stories are read.', lat: 18.9180555, lng: 72.8316666 },
    { code: 'LION_GATE', name: 'Lion Gate', hint: 'A roar guards this entry, where sailors once stride,\nA portside sentinel, proud with pride.\nBrass and might mark this naval domain,\nName the gate that bears a king of the plain.', lat: 18.926808, lng: 72.833937 },
    { code: 'WESTSIDE', name: 'Westside', hint: 'Trendy and bright with clothes to adore,\nStep inside and you’ll want more.\nA compass point, not left or right,\nFind this fashion store named after a direction bright.', lat: 18.9280036, lng: 72.8309223 },
    { code: 'TAJ_HOTEL', name: 'Taj Hotel', hint: 'Born before India was free,\nMy arches whisper history.\nLuxury and legacy blend in my face —\nFind me where time stands still with grace.', lat: 18.9213888, lng: 72.8330555 },
    { code: 'ELECTRIC_HOUSE', name: 'Electric House', hint: 'Where metal lines whisper and overhead wires glow,\nAnd buses wait in quiet rows before they go.\nOne sends power, one sends people on their way —\nFind the corner where light and travel share the same stay.\nHint: Power building beside a major bus point.', lat: 18.9202778, lng: 72.8305556 },
    { code: 'COMPLETED', name: 'Mission Complete', hint: 'Return to Base', lat: 0, lng: 0 }
];

async function seed() {
    console.log("Starting Strict Location Seeding...");

    // 0. Pre-cleanup to avoid Foreign Key constraints
    console.log("Clearing dependent data (Scans & Team Locations)...");

    // Delete all scans (they reference locations)
    const { error: scanError } = await supabase.from('scans').delete().neq('id', 0); // "Delete all" trick if needed, or just delete all
    // Supabase delete requires a filter usually. .neq('id', 0) matches all usually if auto-increment.
    // Or allow delete without where using a specific setting, but safest is a broad filter.
    // Let's assume 'id' > 0.
    if (scanError) console.error("Warning clearing scans:", scanError.message);

    // Reset team locations to avoid FK violation when deleting locations
    // We update them to NULL (assuming nullable) or we have to wait until we insert CLG.
    // Let's try setting to NULL.
    const { error: teamError } = await supabase.from('teams').update({ assigned_location: null }).neq('team_id', 'PLACEHOLDER');
    if (teamError) console.error("Warning resetting teams:", teamError.message);

    // 1. Delete ALL existing locations to remove clutter
    // Note: This requires a WHERE clause. 
    // We will fetch all codes first, then delete them.
    const { data: allLocs, error: fetchError } = await supabase.from('location').select('location_code');

    if (fetchError) {
        console.error("Error fetching locations:", fetchError);
        return;
    }

    if (allLocs && allLocs.length > 0) {
        const codes = allLocs.map(l => l.location_code);
        console.log(`Deleting ${codes.length} existing locations...`);
        const { error: delError } = await supabase.from('location').delete().in('location_code', codes);
        if (delError) {
            console.error("Error deleting locations:", delError);
            return;
        }
    }

    // 2. Insert New Locations
    console.log("Inserting 6 Strict Locations + COMPLETED...");
    for (const loc of locations) {
        const { error } = await supabase.from('location').insert([{
            location_code: loc.code,
            location_name: loc.name,
            location_hint: loc.hint,
            latitude: loc.lat,
            longitude: loc.lng
        }]);

        if (error) {
            console.error(`Error inserting ${loc.code}:`, error.message);
        } else {
            console.log(`Inserted ${loc.code}`);
        }
    }

    console.log("Seeding Complete.");
}

seed();
