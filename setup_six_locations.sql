-- Ensure College exists (Start Point)
INSERT INTO location (location_code, location_name, location_hint, latitude, longitude)
VALUES ('CLG', 'College', 'Starting Point', 18.9236, 72.8324)
ON CONFLICT (location_code) DO NOTHING;

-- The other 5 should already exist from seed_locations.sql (LOC03, LOC05, LOC06, LOC11, LOC12)
-- We can optionally verify or update their names if needed, but we will trust the existing seed for now.
