package org.lei.personalized_advertisement_system.controller;

import org.lei.personalized_advertisement_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String username) {
        return ResponseEntity.ok(userService.getUserDetailsByUsername(username));
    }

    @GetMapping("/show")
    public ResponseEntity<?> userShow() {
        return ResponseEntity.ok(userService.getCurrentUserDetails());
    }

}
