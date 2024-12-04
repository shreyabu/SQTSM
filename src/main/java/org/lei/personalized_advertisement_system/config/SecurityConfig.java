package org.lei.personalized_advertisement_system.config;

import org.lei.personalized_advertisement_system.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Services and configuration components required for security setup.
    private final UserService userService;
    private final PasswordEncoderConfig passwordEncoder;
    private final JwtFilterConfig jwtFilter;

    // Constructor to inject security-related dependencies.
    public SecurityConfig(UserService userService, PasswordEncoderConfig passwordEncoder, JwtFilterConfig jwtFilter) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtFilter = jwtFilter;
    }

    // Security filter chain configuration for handling requests.
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Authorize requests configuration
                .authorizeHttpRequests(auth -> auth
                        // Permit all requests to certain URLs without authentication
                        .requestMatchers(HttpMethod.GET, "/", "/categories", "/ad/click/{id}", "/ad/{id}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/ad/click/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/*").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Require authentication for all other requests
                        .anyRequest().authenticated());
        // Disable CSRF protection, typically for API services where tokens are used instead of cookies.
        http.csrf(AbstractHttpConfigurer::disable);
        // Register a custom JWT filter to run before the standard username/password authentication filter.
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        // Build and return the configured filter chain.
        return http.build();
    }

    // Authentication provider bean to incorporate custom user service and password encoder.
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        // Setting the custom user details service and password encoder.
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder.passwordEncoder());
        return authProvider;
    }

    // Authentication manager to handle authentication within the security context.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}



