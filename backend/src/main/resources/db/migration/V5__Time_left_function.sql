CREATE OR REPLACE FUNCTION get_time_left(auction_end TIMESTAMP)
    RETURNS TEXT AS $$
DECLARE
    seconds_left INT;
BEGIN
    seconds_left := EXTRACT(EPOCH FROM (auction_end - CURRENT_TIMESTAMP));

    IF seconds_left > 86400 THEN
        RETURN CONCAT(FLOOR(seconds_left / 86400), ' days');
    ELSIF seconds_left > 3600 THEN
        RETURN CONCAT(FLOOR(seconds_left / 3600), ' hours');
    ELSIF seconds_left > 0 THEN
        RETURN CONCAT(FLOOR(seconds_left / 60), ' minutes');
    ELSE
        RETURN 'Time is up!';
    END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;