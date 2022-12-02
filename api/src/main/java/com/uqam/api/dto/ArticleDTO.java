package com.uqam.api.dto;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

public class ArticleDTO {

    @NotNull
    private final Integer id;
    @NotNull
    private final String title;
    @NotNull
    private final Set<CategoryDTO> categories;
    @NotNull
    private final List<AuthorDTO> authors;
    @NotNull
    private final List<VersionDTO> versions;

    public ArticleDTO(Integer id, String title, Set<CategoryDTO> categories, List<AuthorDTO> authors, List<VersionDTO> versions) {
        this.id = id;
        this.title = title;
        this.categories = categories;
        this.authors = authors;
        this.versions = versions;
    }
}
