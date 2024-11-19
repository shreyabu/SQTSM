package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;
import org.lei.personalized_advertisement_system.enums.Role;

@Data
public class UserDetailsDTO {
    private String username;
    private String email;
    private String phoneNumber;
    private String realName;
    private Role role;
}
