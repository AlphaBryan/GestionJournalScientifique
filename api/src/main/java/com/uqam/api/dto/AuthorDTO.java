package com.uqam.api.dto;

public class AuthorDTO {

    private final Integer id;
    private final String firstName;
    private final String lastName;

    public AuthorDTO(Integer id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
