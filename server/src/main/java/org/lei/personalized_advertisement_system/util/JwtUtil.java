package org.lei.personalized_advertisement_system.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.lei.personalized_advertisement_system.DTO.TokenDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("#{${jwt.expire_time}}")
    private long expireTime;

    /**
     * Creates a JWT token for the given username.
     *
     * @param username The username to include in the token.
     * @return The generated JWT token.
     */
    public String createToken(String username) {
        Date now = new Date();
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withIssuer("auth0")                 // Issuer of the token
                .withIssuedAt(now)                   // Token issued time
                .withExpiresAt(new Date(now.getTime() + expireTime)) // Token expiration time
                .withClaim("username", username)     // Adds the username claim
                .sign(algorithm);
    }

    /**
     * Creates a TokenDTO object containing the JWT token.
     *
     * @param username The username to include in the token.
     * @return TokenDTO object with the generated token.
     */
    public TokenDTO createTokenJson(String username) {
        return new TokenDTO(createToken(username));
    }

    /**
     * Verifies the JWT token and returns the decoded JWT object.
     *
     * @param token The JWT token string.
     * @return The decoded JWT object.
     * @throws JWTVerificationException If the token verification fails.
     */
    public DecodedJWT verifyToken(String token) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("auth0")
                .build(); // Creates the verifier
        String[] s = token.split(" ");
        return verifier.verify(s[s.length - 1]);
    }

    /**
     * Extracts the username from the JWT token.
     *
     * @param token The JWT token string.
     * @return The username extracted from the token.
     * @throws JWTVerificationException If the token verification fails.
     */
    public String getUsernameFromToken(String token) {
        try {
            DecodedJWT jwt = verifyToken(token);
            return jwt.getClaim("username").asString();
        } catch (JWTVerificationException e) {
            throw new JWTVerificationException(e.getMessage());
        }
    }
}

