package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.UserDetailsDTO;
import org.lei.personalized_advertisement_system.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User addUser(User user);

    UserDetailsDTO getCurrentUserDetails();

    UserDetailsDTO getUserDetailsByUsername(String username);

    User getCurrentUser();
}
