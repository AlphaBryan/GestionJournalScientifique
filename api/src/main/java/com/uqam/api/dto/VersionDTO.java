package com.uqam.api.dto;

import java.sql.Timestamp;
import java.util.List;

public class VersionDTO {

    private final Integer id;
    private final String text;

    private final Timestamp creationDate;

    private final List<EvaluationDTO> evaluations;

    public VersionDTO(Integer id, String text, Timestamp creationDate, List<EvaluationDTO> evaluations) {
        this.id = id;
        this.text = text;
        this.creationDate = creationDate;
        this.evaluations = evaluations;
    }

    public Integer getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public List<EvaluationDTO> getEvaluations() {
        return evaluations;
    }
}
