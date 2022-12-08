package com.uqam.api.dto;

public class VersionDTO {

    private final Integer id;
    private final String text;

    public VersionDTO(Integer id, String text) {
        this.id = id;
        this.text = text;
    }

    public Integer getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}
