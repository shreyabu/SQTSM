package org.lei.personalized_advertisement_system.service;

import jakarta.servlet.http.HttpServletRequest;
import org.lei.personalized_advertisement_system.DTO.UserDetailsDTO;
import org.lei.personalized_advertisement_system.entity.User;
import org.lei.personalized_advertisement_system.enums.Role;
import org.lei.personalized_advertisement_system.repository.UserRepository;
import org.lei.personalized_advertisement_system.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Objects;

/**
 * Service class for managing users in the application.
 * This class provides methods to add, delete, update, and retrieve user information.
 * It handles user authentication, registration, and authorization based on roles.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Adds a new user to the system with unique username and email.
     * Encodes the user's password before saving to the database.
     *
     * @param user the user entity to add
     * @return the saved user entity
     * @throws RuntimeException if the username or email already exists
     */
    @Override
    public User addUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent())
            throw new RuntimeException("Username already exists!");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Retrieves the detailed information of the current user.
     *
     * @return UserDetailsDTO containing the current user's details
     */
    @Override
    public UserDetailsDTO getCurrentUserDetails() {
        return convertUserToUserDetailsDTO(getCurrentUser());
    }

    /**
     * Retrieves the detailed information of a specific user by username.
     *
     * @param username the username of the user
     * @return UserDetailsDTO containing the specified user's details
     * @throws RuntimeException if the user does not exist or the current user does not have permission to view the details
     */
    @Override
    public UserDetailsDTO getUserDetailsByUsername(String username) {
        if (getCurrentUser().getRole() == Role.CUSTOMER) {
            throw new RuntimeException("You do not have permission to load this user!");
        }

        return userRepository.findByUsername(username)
                .map(this::convertUserToUserDetailsDTO)
                .orElseThrow(() -> new RuntimeException("User with username " + username + " not found!"));
    }


    /**
     * Retrieves the currently authenticated user based on the JWT token from the request.
     *
     * @return the currently authenticated user
     * @throws RuntimeException if the token is invalid or the user does not exist
     */
    @Override
    public User getCurrentUser() {
        // Extract the current HTTP request from the Spring context
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        // Get the Authorization header, typically containing the JWT token
        String token = request.getHeader("Authorization");
        try {
            // Decode the token to extract the username and fetch the user
            return userRepository.findByUsername(jwtUtil.getUsernameFromToken(token)).isPresent() ? userRepository.findByUsername(jwtUtil.getUsernameFromToken(token)).get() : null;
        } catch (Exception e) {
            // Handle case where token is invalid or does not decode properly
            throw new RuntimeException("Invalid token!");
        }
    }

    /**
     * Implements UserDetails load by username for Spring Security.
     *
     * @param username the username of the user to load
     * @return the UserDetails of the requested user
     * @throws UsernameNotFoundException if the user is not found in the database
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User with username " + username + " not found!"));
    }

    /**
     * Converts a User entity to a UserDetailsDTO object.
     *
     * @param user the user entity to convert
     * @return a UserDetailsDTO containing the user's information
     */
    private UserDetailsDTO convertUserToUserDetailsDTO(User user) {
        UserDetailsDTO userListDTO = new UserDetailsDTO();
        userListDTO.setUsername(user.getUsername());
        userListDTO.setRole(user.getRole());
        return userListDTO;
    }
}
