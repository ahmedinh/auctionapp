package ba.atlant.auctionapp.exception;

public class ServiceException extends RuntimeException {

    private final String errorCode;

    public ServiceException(String message) {
        super(message);
        this.errorCode = "UNSPECIFIED";
    }

    public ServiceException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ServiceException(String message, Throwable cause) {
        super(message, cause);
        this.errorCode = "UNSPECIFIED";
    }

    public ServiceException(String message, String errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}