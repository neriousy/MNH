package com.druzynav.services;

import com.druzynav.models.user.User;
import com.druzynav.models.user.dto.SearchDTO;
import com.druzynav.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchService {
    @Autowired
    private UserRepository userRepository;


    public ResponseEntity<List<SearchDTO>> searchTen(){
        List<SearchDTO> searchDTOS = new ArrayList<>();
        List<User> users = userRepository.findAll();
        SearchDTO searchDTO = null;
        for (User user: users
             ) {
            searchDTO = new SearchDTO(user.getFirstname(), user.getLastname(), user.getAge(), user.getGender());
            searchDTOS.add(searchDTO);
        }

        return new ResponseEntity<List<SearchDTO>>(searchDTOS,HttpStatus.OK);
    }


}
