package ba.atlant.auctionapp.error;

import java.util.*;

public class Error {
    public static HashMap<String, String> errorMessage(String message) {
        var map = new HashMap<String,String>();
        map.put("error",message);
        return map;
    }

    public static HashMap<String, String> objectNotFoundID(String identifier) {
        return errorMessage(identifier + " not found for given ID.");
    }
}
