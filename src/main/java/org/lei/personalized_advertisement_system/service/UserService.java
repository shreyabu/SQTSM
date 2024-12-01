package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.UserDetailsDTO;
import org.lei.personalized_advertisement_system.entity.Product;
import org.lei.personalized_advertisement_system.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User addUser(User user);

    UserDetailsDTO getCurrentUserDetails();

    UserDetailsDTO getUserDetailsByUsername(String username);

    List<String> getPreferencesByUsername(String username);

    User getCurrentUser();

    void updateUserPreferences(List<Product> products);
}
