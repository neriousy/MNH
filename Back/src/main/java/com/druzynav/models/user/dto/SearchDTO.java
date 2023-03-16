package com.druzynav.models.user.dto;

import com.druzynav.models.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchDTO {
    public String firstname;
    public String lastname;
    public int age;
    public String gender;

    public SearchDTO(User user){
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.age = user.getAge();
        this.gender = user.getGender();
    }
}
