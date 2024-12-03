package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.LoggedInUserDTO;
import org.lei.personalized_advertisement_system.DTO.TokenDTO;
import org.lei.personalized_advertisement_system.DTO.UserLoginDTO;
import org.lei.personalized_advertisement_system.DTO.UserRegisterDTO;

public interface AuthService {
    LoggedInUserDTO login(UserLoginDTO loginUser);

    LoggedInUserDTO register(UserRegisterDTO registerUser);
}
