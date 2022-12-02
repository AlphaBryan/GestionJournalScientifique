package com.uqam.api.mapper;

import com.uqam.api.dto.ArticleDTO;
import com.uqam.api.model.entity.Article;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ArticleDTOMapper {

    ArticleDTO toArticleDTO(Article article);

}
