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

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Set<CategoryDTO> getCategories() {
        return categories;
    }

    public List<AuthorDTO> getAuthors() {
        return authors;
    }

    public List<VersionDTO> getVersions() {
        return versions;
    }
}
