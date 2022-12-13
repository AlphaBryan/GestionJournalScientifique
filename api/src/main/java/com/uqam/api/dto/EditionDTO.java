package com.uqam.api.dto;

import com.uqam.api.model.entity.EditionPhase;

import java.sql.Timestamp;

public class EditionDTO {

    private final Integer id;

    private final String name;

    private final Timestamp submissionLimitDate;

    private final EditionPhase phase;

    public EditionDTO(Integer id, String name, Timestamp submissionLimitDate, EditionPhase phase) {
        this.id = id;
        this.name = name;
        this.submissionLimitDate = submissionLimitDate;
        this.phase = phase;
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

    public EditionPhase getPhase() {
        return phase;
    }
}
