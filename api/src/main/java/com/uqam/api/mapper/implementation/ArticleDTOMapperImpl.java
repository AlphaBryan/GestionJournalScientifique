package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.*;
import com.uqam.api.mapper.*;
import com.uqam.api.model.entity.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class ArticleDTOMapperImpl implements ArticleDTOMapper {

    private final CategoryDTOMapper categoryDTOMapper;
    private final AuthorDTOMapper authorDTOMapper;
    private final VersionDTOMapper versionDTOMapper;
    private final CommitteeDTOMapper committeeDTOMapper;

    public ArticleDTOMapperImpl(CategoryDTOMapper categoryDTOMapper, AuthorDTOMapper authorDTOMapper, VersionDTOMapper versionDTOMapper, CommitteeDTOMapper committeeDTOMapper) {
        this.categoryDTOMapper = categoryDTOMapper;
        this.authorDTOMapper = authorDTOMapper;
        this.versionDTOMapper = versionDTOMapper;
        this.committeeDTOMapper = committeeDTOMapper;
    }

    @Override
    public ArticleDTO toArticleDTO(Article article) {
        Set<CategoryDTO> categories = new HashSet<>();
        for (Category category : article.getCategories()) {
            categories.add(categoryDTOMapper.toCategoryDTO(category));
        }

        List<AuthorDTO> authors = new ArrayList<>();
        for (Author author : article.getAuthors()) {
            authors.add(authorDTOMapper.toAuthorDTO(author));
        }

        List<VersionDTO> versions = new ArrayList<>();
        for (Version version : article.getVersions()) {
            versions.add(versionDTOMapper.toVersionDTO(version));
        }

        ScientificCommittee scientificCommittee = article.getScientificCommittee();
        CommitteeDTO committeeDTO = null;
        if (scientificCommittee != null) {
            committeeDTO = committeeDTOMapper.toCommitteeDTO(scientificCommittee);
        }

        return new ArticleDTO(article.getId(), article.getTitle(), article.getPhase(), article.getCreationDate(), categories, authors, versions, committeeDTO);
    }
}
