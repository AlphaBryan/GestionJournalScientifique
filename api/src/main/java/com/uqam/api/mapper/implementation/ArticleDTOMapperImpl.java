package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.ArticleDTO;
import com.uqam.api.dto.AuthorDTO;
import com.uqam.api.dto.CategoryDTO;
import com.uqam.api.dto.VersionDTO;
import com.uqam.api.mapper.ArticleDTOMapper;
import com.uqam.api.mapper.AuthorDTOMapper;
import com.uqam.api.mapper.CategoryDTOMapper;
import com.uqam.api.mapper.VersionDTOMapper;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Author;
import com.uqam.api.model.entity.Category;
import com.uqam.api.model.entity.Version;
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

    public ArticleDTOMapperImpl(CategoryDTOMapper categoryDTOMapper, AuthorDTOMapper authorDTOMapper, VersionDTOMapper versionDTOMapper) {
        this.categoryDTOMapper = categoryDTOMapper;
        this.authorDTOMapper = authorDTOMapper;
        this.versionDTOMapper = versionDTOMapper;
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

        return new ArticleDTO(article.getId(), article.getTitle(), categories, authors, versions);
    }
}
