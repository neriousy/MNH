package com.druzynav.controllers;

import com.druzynav.auth.dto.TokenRequest;
import com.druzynav.auth.JwtService;
import com.druzynav.models.user.Role;
import com.druzynav.models.user.User;
import com.druzynav.repositories.CharacteristicsRepository;
import com.druzynav.repositories.UserRepository;
import com.druzynav.models.characteristic.dto.CharacteristicsDTO;
import com.druzynav.models.user.dto.UserDTO;
import com.druzynav.services.UserService;
import com.github.javafaker.Faker;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.locks.ReentrantReadWriteLock;

@RestController
@AllArgsConstructor
@CrossOrigin
public class UserController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;


    private UserRepository userRepository;
    private CharacteristicsRepository characteristicsRepository;

    @PostMapping(value = "/api/v1/userInfo")
    public ResponseEntity test(@RequestBody TokenRequest request,
                                               HttpServletResponse response) {
        if(jwtService.isTokenExpired(request.getToken())){
            return ResponseEntity.ok("Expired");
        }
        UserDTO userResponse = userService.UserInfo(request);

        if(userResponse.getUserId() == -1){
            return ResponseEntity.ok("User not found");
        }

        return ResponseEntity.ok(userResponse);

    }

    @PostMapping(value = "/api/v1/saveUserInfo")
    public ResponseEntity saveUserInfo(@RequestBody UserDTO request){
        return userService.SaveUserInfo(request);
    }


    @PostMapping(value = "/populate")
    public void populateWithMockUsers() {
        Faker faker = new Faker();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String passwd = encoder.encode("qwerty");

        for (int i = 0; i < 100; i++) {
            User user = User.builder()
                    .firstname(faker.name().firstName())
                    .lastname(faker.name().lastName())
                    .email(faker.internet().emailAddress())
                    .phonenumber(faker.phoneNumber().cellPhone())
                    .password(passwd)
                    .gender("female")
                    .role(Role.USER)
                    .age(faker.number().numberBetween(18, 100))
                    .enabled(true)
                    .build();
            userRepository.save(user);
        }
    }

}
