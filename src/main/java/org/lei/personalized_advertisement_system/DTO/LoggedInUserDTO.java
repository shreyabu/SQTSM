package org.lei.personalized_advertisement_system.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoggedInUserDTO {
    private UserDetailsDTO user;
    private String token;
}
