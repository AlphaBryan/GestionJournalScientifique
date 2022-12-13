package com.uqam.api.service;

import com.uqam.api.model.dao.ArticleDAO;
import com.uqam.api.model.dao.EditionDAO;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Edition;
import com.uqam.api.model.entity.EditionPhase;
import com.uqam.api.model.entity.Phase;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.Set;

@Component
public class EditionService {

    private final EditionDAO editionDAO;
    private final ArticleDAO articleDAO;

    public EditionService(EditionDAO editionDAO, ArticleDAO articleDAO) {
        this.editionDAO = editionDAO;
        this.articleDAO = articleDAO;
    }

    public Optional<Edition> getById(Integer editionId) {
        return editionDAO.findById(editionId);
    }

    public Iterable<Edition> getAll() {
        return editionDAO.findAll();
    }

    public Edition create(String name, Timestamp submissionLimitDate) {
        return editionDAO.save(new Edition(name, submissionLimitDate));
    }

    public Edition update(Integer editionId, String name, Timestamp submissionLimitDate) {
        Optional<Edition> editionRes = editionDAO.findById(editionId);
        if (editionRes.isEmpty()) return null;

        Edition edition = editionRes.get();
        edition.setName(name);
        edition.setSubmissionLimitDate(submissionLimitDate);
        return editionDAO.save(edition);
    }

    public Edition startCameraReadyPhase(Integer editionId) {
        Optional<Edition> edition = editionDAO.findById(editionId);
        if (edition.isEmpty()) return null;

        Set<Article> articles = edition.get().getArticles();
        for (Article article : articles) {
            if (article.getPhase() == Phase.ACCEPTED) {
                article.setPhase(Phase.CAMERA_READY);
                articleDAO.save(article);
            }
        }

        edition.get().setPhase(EditionPhase.CAMERA_READY);
        return editionDAO.save(edition.get());
    }

    public Edition publishArticles(Integer editionId) {
        Optional<Edition> edition = editionDAO.findById(editionId);
        if (edition.isEmpty()) return null;

        Set<Article> articles = edition.get().getArticles();
        for (Article article : articles) {
            if (article.getPhase() == Phase.READY_TO_PUBLISH) {
                article.setPhase(Phase.PUBLISHED);
                articleDAO.save(article);
            }
        }

        edition.get().setPhase(EditionPhase.PUBLISHED);
        return editionDAO.save(edition.get());
    }

}
