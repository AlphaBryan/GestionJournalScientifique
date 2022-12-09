package com.uqam.api.dto;

public class AuthorDTO {

    private final Integer id;
    private final String firstName;
    private final String lastName;

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public AuthorDTO(Integer id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }


}
