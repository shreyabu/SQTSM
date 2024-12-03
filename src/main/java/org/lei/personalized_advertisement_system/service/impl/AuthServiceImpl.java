package org.lei.personalized_advertisement_system.service.impl;

import org.lei.personalized_advertisement_system.DTO.LoggedInUserDTO;
import org.lei.personalized_advertisement_system.DTO.TokenDTO;
import org.lei.personalized_advertisement_system.DTO.UserLoginDTO;
import org.lei.personalized_advertisement_system.DTO.UserRegisterDTO;
import org.lei.personalized_advertisement_system.entity.User;
import org.lei.personalized_advertisement_system.enums.Role;
import org.lei.personalized_advertisement_system.service.AuthService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.lei.personalized_advertisement_system.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

/**
 * Provides authentication services for handling user logins and registrations.
 * This service manages user authentication with the security framework and token management using JWTs.
 * It supports operations for user login and registration, each returning a tokenized response upon success.
 */
@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Authenticates a user based on username and password, and generates a JWT token upon successful authentication.
     *
     * @param loginUser A {@link UserLoginDTO} object containing the user's login credentials.
     * @return A {@link TokenDTO} containing the JWT token.
     * @throws RuntimeException If the username or password is incorrect.
     */
    @Override
    public LoggedInUserDTO login(UserLoginDTO loginUser) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
            return new LoggedInUserDTO(userService.getUserDetailsByUsername(loginUser.getUsername()), jwtUtil.createToken(loginUser.getUsername()));
        } catch (Exception e) {
            throw new RuntimeException("Username or password is incorrect!");
        }
    }

    /**
     * Registers a new user with provided user details and returns a JWT token.
     *
     * @param registerUser A {@link UserRegisterDTO} object containing the user's registration details.
     * @return A {@link TokenDTO} containing the JWT token for the newly registered user.
     */
    @Override
    public LoggedInUserDTO register(UserRegisterDTO registerUser) {
        User newUser = new User();
        newUser.setUsername(registerUser.getUsername());
        newUser.setPassword(registerUser.getPassword());
        newUser.setRole(Role.CUSTOMER);
        newUser.setPreferences(String.join(",", registerUser.getPreferences()));
        User user = userService.addUser(newUser);
        return new LoggedInUserDTO(userService.getUserDetailsByUsername(user.getUsername()), jwtUtil.createToken(user.getUsername()));
    }
}
