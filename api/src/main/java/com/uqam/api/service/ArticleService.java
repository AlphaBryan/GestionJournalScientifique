package com.uqam.api.service;

import com.uqam.api.model.dao.*;
import com.uqam.api.model.entity.*;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ArticleService {

    private final ArticleDAO articleDAO;
    private final VersionDAO versionDAO;
    private final EvaluationDAO evaluationDAO;
    private final ScientificCommitteeDAO scientificCommitteeDAO;
    private final AuthorDAO authorDAO;
    private final EditionDAO editionDAO;
    private final CategoryDAO categoryDAO;

    public ArticleService(ArticleDAO articleDAO, VersionDAO versionDAO, EvaluationDAO evaluationDAO, ScientificCommitteeDAO scientificCommitteeDAO, AuthorDAO authorDAO, EditionDAO editionDAO, CategoryDAO categoryDAO) {
        this.articleDAO = articleDAO;
        this.versionDAO = versionDAO;
        this.evaluationDAO = evaluationDAO;
        this.scientificCommitteeDAO = scientificCommitteeDAO;
        this.authorDAO = authorDAO;
        this.editionDAO = editionDAO;
        this.categoryDAO = categoryDAO;
    }

    public Optional<Article> getById(Integer articleId) {
        return articleDAO.findById(articleId);
    }

    public Iterable<Article> getByAuthor(Integer authorId) {
        Optional<Author> author = authorDAO.findById(authorId);
        if (author.isEmpty()) return null;

        return author.get().getArticles();
    }

    public Iterable<Article> getByEdition(Integer editionId) {
        Optional<Edition> edition = editionDAO.findById(editionId);
        if (edition.isEmpty()) return null;

        return edition.get().getArticles();
    }

    public Iterable<Article> getByScientificCommittee(Integer committeeId) {
        Optional<ScientificCommittee> scientificCommittee = scientificCommitteeDAO.findById(committeeId);
        if (scientificCommittee.isEmpty()) return null;

        return scientificCommittee.get().getArticles();

    }

    public Article create(
            String title,
            String text,
            Author firstAuthor,
            List<Integer> categoriesId,
            List<Integer> authorsId,
            Integer editionId
    ) {
        Optional<Edition> edition = editionDAO.findById(editionId);
        if (edition.isEmpty()) return null;

        Set<Category> categories = new HashSet<>();
        for (Integer categoryId : categoriesId) {
            Optional<Category> category = categoryDAO.findById(categoryId);
            if (category.isEmpty()) {
                return null;
            }
            categories.add(category.get());
        }

        List<Author> authors = new ArrayList<>();
        authors.add(firstAuthor);
        for (Integer authorId : authorsId) {
            Optional<Author> author = authorDAO.findById(authorId);
            if (author.isEmpty()) {
                return null;
            }
            authors.add(author.get());
        }

        Version version = new Version(text);
        return articleDAO.save(new Article(title, categories, authors, version, edition.get()));
    }

    public Evaluation evaluate(Integer versionId, Integer articleId, Integer rate, String comment, boolean isCommentMajor, Evaluator evaluator) {
        Optional<Version> version = versionDAO.findById(versionId);
        if (version.isEmpty()) return null;

        if (!Objects.equals(version.get().getArticle().getId(), articleId)) return null;
        if (version.get().getArticle().getPhase() != Phase.RELECTURE) return null;

        List<Evaluation> evaluations = version.get().getEvaluations();
        for (Evaluation evaluation : evaluations) {
            if (Objects.equals(evaluation.getEvaluator().getId(), evaluator.getId())) return null;
        }

        return evaluationDAO.save(new Evaluation(rate, comment, isCommentMajor, version.get(), evaluator));
    }

    public ScientificCommittee affectToScientificCommittee(Integer articleId, Integer committeeId) {
        Optional<ScientificCommittee> scientificCommitteeRes = scientificCommitteeDAO.findById(committeeId);
        if (scientificCommitteeRes.isEmpty()) return null;

        Optional<Article> article = articleDAO.findById(articleId);
        if (article.isEmpty()) return null;
        if (article.get().getPhase() != Phase.CREATED) return null;

        article.get().setScientificCommittee(scientificCommitteeRes.get());
        articleDAO.save(article.get());

        return scientificCommitteeRes.get();
    }

    public Article ready(Integer articleId) {
        Optional<Article> article = articleDAO.findById(articleId);
        if (article.isEmpty()) return null;

        if (article.get().getPhase() != Phase.CAMERA_READY) return null;

        article.get().setPhase(Phase.READY_TO_PUBLISH);

        return articleDAO.save(article.get());
    }

}
