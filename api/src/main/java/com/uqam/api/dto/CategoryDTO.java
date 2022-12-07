package com.uqam.api.dto;

public class CategoryDTO {

    private final Integer id;
    private final String label;

    public CategoryDTO(Integer id, String label) {
        this.id = id;
        this.label = label;
    }

    public Integer getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }
}
