CREATE OR REPLACE FUNCTION calculate_levenshtein(s1 text, s2 text)
    RETURNS int AS
$$
DECLARE
    len1  int := length(s1);
    len2  int := length(s2);
    dp    int[];
    i     int;
    j     int;
    index int;
BEGIN
    dp := ARRAY(SELECT 0 FROM generate_series(1, (len1 + 1) * (len2 + 1)));
    FOR i IN 0..len1
        LOOP
            index := i * (len2 + 1) + 1;
            dp[index] := i;
        END LOOP;

    FOR j IN 0..len2
        LOOP
            index := j + 1;
            dp[index] := j;
        END LOOP;
    FOR i IN 1..len1
        LOOP
            FOR j IN 1..len2
                LOOP
                    IF substr(s1, i, 1) = substr(s2, j, 1) THEN
                        dp[(i * (len2 + 1)) + j + 1] := dp[((i - 1) * (len2 + 1)) + j];
                    ELSE
                        dp[(i * (len2 + 1)) + j + 1] := 1 + LEAST(
                                dp[i * (len2 + 1) + j],
                                dp[((i - 1) * (len2 + 1)) + j + 1],
                                dp[((i - 1) * (len2 + 1)) + j]
                            );
                    END IF;
                END LOOP;
        END LOOP;
    RETURN dp[len1 * (len2 + 1) + len2 + 1];
END;
$$ LANGUAGE plpgsql IMMUTABLE;