package com.uqam.api.model.dao;

import com.uqam.api.model.entity.Article;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleDAO extends CrudRepository<Article, Integer> {

}
