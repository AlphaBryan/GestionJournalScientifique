package com.uqam.api.model.dao;

import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Author;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleDAO extends CrudRepository<Article, Integer> {

    @Query("SELECT a FROM Article a WHERE ?1 IN a.authors")
    Iterable<Article> findArticlesByAuthor(Author author);

}
