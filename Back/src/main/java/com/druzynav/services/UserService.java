package com.druzynav.services;

import com.druzynav.auth.JwtService;
import com.druzynav.auth.dto.TokenRequest;
import com.druzynav.models.user.User;
import com.druzynav.models.user.dto.UserDTO;
import com.druzynav.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    public JwtService jwtService;
    @Autowired
    public UserRepository userRepository;

    public UserDTO UserInfo(TokenRequest token){
        String email = jwtService.extractUsername(token.getToken());

        Optional<User> user = userRepository.findByEmail(email);
        UserDTO userResponse = new UserDTO();
        if(user.isPresent()){
            User _user = user.get();
            userResponse.setUserId(_user.getId());
            userResponse.setFirstname(_user.getFirstname());
            userResponse.setLastname(_user.getLastname());
            userResponse.setUsername(_user.getUsername());
            userResponse.setAge(_user.getAge());
            userResponse.setGender(_user.getGender());
            userResponse.setPhonenumber(_user.getPhonenumber());
        }else{
            userResponse.setUserId(-1);
        }

        return userResponse;
    }

    public ResponseEntity<?> SaveUserInfo(UserDTO userDTO){
        Optional<User> userSearch = userRepository.findById(userDTO.getUserId());
        if(userSearch.isEmpty()){
            return new ResponseEntity<>("Bad request", HttpStatus.BAD_REQUEST);
        }
        User user = userSearch.get();

        user.setFirstname(userDTO.getFirstname());
        user.setLastname(userDTO.getLastname());
        user.setGender(userDTO.getGender());
        user.setAge(userDTO.getAge());
        user.setPhonenumber(userDTO.getPhonenumber());

        userRepository.save(user);

        return new ResponseEntity<>("Saved", HttpStatus.OK);
    }

    public ResponseEntity<List<User>> getTenUsers(){
        return new ResponseEntity<List<User>>(userRepository.findAll(), HttpStatus.OK);
    }
}
