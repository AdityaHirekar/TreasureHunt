-- Clean up existing locations to ensure no ghosts
DELETE FROM location;

-- Insert the 6 Authorized Locations
INSERT INTO location (location_code, location_name, location_hint, latitude, longitude) VALUES
-- 1. College (Start)
('CLG', 'College', 'Starting Point', 18.92368888207889, 72.83244098149588),

-- 2. Radio Club (LOC12)
('LOC12', 'Radio Club', 'I stand at the edge where land meets tide,\nWatching yachts whisper as they glide.\nHistory behind me, waves ahead —\nFind the place where sea stories are read.', 18.9180555, 72.8316666),

-- 3. Lion Gate (LOC05)
('LOC05', 'Lion Gate', 'A roar guards this entry, where sailors once stride,\nA portside sentinel, proud with pride.\nBrass and might mark this naval domain,\nName the gate that bears a king of the plain.', 18.926808, 72.833937),

-- 4. Westside (LOC06)
('LOC06', 'Westside', 'Trendy and bright with clothes to adore,\nStep inside and you’ll want more.\nA compass point, not left or right,\nFind this fashion store named after a direction bright.', 18.9280036, 72.8309223),

-- 5. Taj Hotel (LOC11)
('LOC11', 'Taj Hotel', 'Born before India was free,\nMy arches whisper history.\nLuxury and legacy blend in my face —\nFind me where time stands still with grace.', 18.9213888, 72.8330555),

-- 6. Electric House (LOC03)
('LOC03', 'Electric House', 'Where metal lines whisper and overhead wires glow,\nAnd buses wait in quiet rows before they go.\nOne sends power, one sends people on their way —\nFind the corner where light and travel share the same stay.\nHint: Power building beside a major bus point.', 18.9202778, 72.8305556);

-- "COMPLETED" Location for logic safety
INSERT INTO location (location_code, location_name, location_hint, latitude, longitude)
VALUES ('COMPLETED', 'Mission Complete', 'Return to Base', 0, 0);

