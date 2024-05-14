package ba.atlant.auctionapp.config.jwt;

import ba.atlant.auctionapp.model.PersonDetails;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    @Value("${application.security.jwt.secret-key}")
    private String jwtSecret;
    @Value("${application.security.jwt.expiration}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        PersonDetails userPrincipal = (PersonDetails) authentication.getPrincipal();
        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + jwtExpirationMs);
        String role = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No roles found for user"));
        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .claim("role", role)
                .claim("userId", userPrincipal.getId())
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public Integer getUserIdFromJwtToken(String token) {
        return (Integer) Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("userId");
    }

    public boolean validateJwtToken(String authToken, HttpServletResponse response) throws IOException {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException | MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT claims string is empty: " + e.getMessage());
        } catch (AccessDeniedException e) {
            logger.error("Access is denied: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access is denied: " + e.getMessage());
        }
        return false;
    }
}