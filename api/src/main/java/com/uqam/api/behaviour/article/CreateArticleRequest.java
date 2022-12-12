package com.uqam.api.behaviour.article;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class CreateArticleRequest {

    @NotNull
    @Size(min = 3, max = 50)
    private String title;

    @NotNull
    private List<Integer> categoriesId;

    @NotNull
    private List<Integer> authorsId;


    @NotNull
    private List<Integer> correspondantsId;

    @NotNull
    private Integer editionId;


    public List<Integer> getAuthorsId() {
        return authorsId;
    }

    public String getTitle() {
        return title;
    }

    public List<Integer> getCategoriesId() {
        return categoriesId;
    }

    public Integer getEditionId() {
        return editionId;
    }
    public List<Integer> getCorrespondantsId() {
        return correspondantsId;
    }

}
