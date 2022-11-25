package com.uqam.api.behaviour.category;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UpdateCategoryRequest {
    @NotNull
    @Size(min = 3, max = 20)
    private String label;

    public String getLabel() {
        return label;
    }
}
