package com.uqam.api.dto;

public class EvaluatorDTO {

    private final Integer id;
    private final String firstName;
    private final String lastName;

    private final Integer committeeId;

    public EvaluatorDTO(Integer id, String firstName, String lastName, Integer committeeId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.committeeId = committeeId;
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

    public Integer getCommitteeId() {
        return committeeId;
    }
}
