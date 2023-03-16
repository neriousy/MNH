package com.druzynav.models.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer userId;
    private String firstname;
    private String lastname;
    private String username;
    private Integer age;
    private String gender;
    private String phonenumber;

}
