package com.uqam.api.model.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String title;

    private Phase phase;

    @ManyToMany(targetEntity = Category.class)
    private Set<Category> categories;

    @ManyToMany(targetEntity = Author.class)
    private List<Author> authors;

    @OneToMany(targetEntity = Version.class, cascade = CascadeType.ALL)
    private List<Version> versions;

    @ManyToOne(targetEntity = ScientificCommittee.class, fetch = FetchType.LAZY)
    private ScientificCommittee scientificCommittee;

    protected Article() {
    }

    public Article(String title, Set<Category> categories, List<Author> authors, Version version) {
        this.title = title;
        this.categories = categories;
        this.authors = authors;
        List<Version> versions = new ArrayList<>();
        versions.add(version);
        this.versions = versions;
        this.phase = Phase.CREATED;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public List<Version> getVersions() {
        return versions;
    }

    public Phase getPhase() {
        return phase;
    }

    public void setPhase(Phase phase) {
        this.phase = phase;
    }

    public ScientificCommittee getScientificCommittee() {
        return scientificCommittee;
    }

    public void setScientificCommittee(ScientificCommittee scientificCommittee) {
        this.scientificCommittee = scientificCommittee;
        if (scientificCommittee != null) {
            this.phase = Phase.RELECTURE;
        }
    }
}
