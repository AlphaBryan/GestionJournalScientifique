package com.uqam.api.dto;

import java.sql.Timestamp;

public class EditionDTO {

    private final Integer id;

    private final String name;

    private final Timestamp submissionLimitDate;

    public EditionDTO(Integer id, String name, Timestamp submissionLimitDate) {
        this.id = id;
        this.name = name;
        this.submissionLimitDate = submissionLimitDate;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Timestamp getSubmissionLimitDate() {
        return submissionLimitDate;
    }
}
