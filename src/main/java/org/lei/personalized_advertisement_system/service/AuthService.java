package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.TokenDTO;
import org.lei.personalized_advertisement_system.DTO.UserLoginDTO;
import org.lei.personalized_advertisement_system.DTO.UserRegisterDTO;

public interface AuthService {
    TokenDTO login(UserLoginDTO loginUser);

    TokenDTO register(UserRegisterDTO registerUser);
}
