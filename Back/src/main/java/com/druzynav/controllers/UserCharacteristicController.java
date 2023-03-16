package com.druzynav.controllers;

import com.druzynav.models.characteristic.dto.CharacteristicsDTO;
import com.druzynav.models.dto.DtoById;
import com.druzynav.models.userCharacteristic.UserCharacteristic;

import com.druzynav.services.UserCharacteristicService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
public class UserCharacteristicController {

    @Autowired
    private UserCharacteristicService userCharacteristicService;

    @PostMapping("/api/v1/saveUserChar")
    public ResponseEntity<?> saveChar(@RequestBody CharacteristicsDTO entity){
        return userCharacteristicService.saveUserChar(entity);
    }

    @PostMapping("/api/v1/getUserChar")
    public ResponseEntity<?> getCharById(@RequestBody DtoById userId){
        return userCharacteristicService.userCharByUserId(userId.getId());
    }
}
