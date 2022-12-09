package com.uqam.api.dto;

import com.uqam.api.model.entity.Phase;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

public class ArticleDTO {

    @NotNull
    private final Integer id;
    @NotNull
    private final String title;
    @NotNull
    private final Phase phase;
    @NotNull
    private final Timestamp creationDate;
    @NotNull
    private final Set<CategoryDTO> categories;
    @NotNull
    private final List<AuthorDTO> authors;
    @NotNull
    private final List<VersionDTO> versions;
    private final CommitteeDTO committee;

    public ArticleDTO(Integer id, String title, Phase phase, Timestamp creationDate, Set<CategoryDTO> categories, List<AuthorDTO> authors, List<VersionDTO> versions, CommitteeDTO committee) {
        this.id = id;
        this.title = title;
        this.phase = phase;
        this.creationDate = creationDate;
        this.categories = categories;
        this.authors = authors;
        this.versions = versions;
        this.committee = committee;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Phase getPhase() {
        return phase;
    }

    public Timestamp getCreationDate() {
        return creationDate;
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

    public CommitteeDTO getCommittee() {
        return committee;
    }
}
