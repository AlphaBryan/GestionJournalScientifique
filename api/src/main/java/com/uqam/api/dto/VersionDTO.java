package com.uqam.api.dto;

import java.sql.Timestamp;

public class VersionDTO {

    private final Integer id;
    private final String text;

    private final Timestamp creationDate;

    public VersionDTO(Integer id, String text, Timestamp creationDate) {
        this.id = id;
        this.text = text;
        this.creationDate = creationDate;
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
}
