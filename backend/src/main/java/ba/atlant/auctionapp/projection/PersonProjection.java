package ba.atlant.auctionapp.projection;

public interface PersonProjection {
    String getFirstName();
    String getLastName();
    String getEmail();
    Integer getBirthDay();
    Integer getBirthMonth();
    Integer getBirthYear();
    String getPhoneNumber();
    String getShippingStreet();
    String getShippingCity();
    String getShippingZipCode();
    String getShippingState();
    String getShippingCountry();
    String getCardName();
    String getCardNumber();
    Integer getExpirationMonth();
    Integer getExpirationYear();
    Integer getCVC();
}