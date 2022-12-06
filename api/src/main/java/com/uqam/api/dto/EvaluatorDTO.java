package com.uqam.api.dto;

public class EvaluatorDTO {

    private final Integer id;
    private final String firstName;
    private final String lastName;

    public EvaluatorDTO(Integer id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
