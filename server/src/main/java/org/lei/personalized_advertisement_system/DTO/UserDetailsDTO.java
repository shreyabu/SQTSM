package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;
import org.lei.personalized_advertisement_system.enums.Role;

import java.util.List;

@Data
public class UserDetailsDTO {
    private String username;
    private Role role;
    private List<String> preferences;
}
