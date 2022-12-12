package com.uqam.api.service;

import com.uqam.api.model.dao.*;
import com.uqam.api.model.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ArticleService {

    private final VersionService versionService;
    private final ArticleDAO articleDAO;
    private final VersionDAO versionDAO;
    private final EvaluationDAO evaluationDAO;
    private final ScientificCommitteeDAO scientificCommitteeDAO;
    private final AuthorDAO authorDAO;
    private final EditionDAO editionDAO;
    private final CategoryDAO categoryDAO;
    @Autowired
    private EmailService emailService;

    public ArticleService(VersionService versionService, ArticleDAO articleDAO, VersionDAO versionDAO, EvaluationDAO evaluationDAO, ScientificCommitteeDAO scientificCommitteeDAO, AuthorDAO authorDAO, EditionDAO editionDAO, CategoryDAO categoryDAO) {
        this.versionService = versionService;
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
            Author firstAuthor,
            List<Integer> categoriesId,
            List<Integer> authorsId,
            List<Integer> correspondantsId,
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
        List<Author> correspondants = new ArrayList<>();
        authors.add(firstAuthor);
        for (Integer authorId : authorsId) {
            Optional<Author> author = authorDAO.findById(authorId);
            if (author.isEmpty()) {
                return null;
            }
            authors.add(author.get());
            if(correspondantsId.contains(authorId)){
                correspondants.add(author.get());
            }
        }

        Article article = new Article(title, categories, authors, correspondants, edition.get());
        article =  articleDAO.save(article);
        notifyCorrespondants(article);
        return article ;

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
        notifyAuthors(article.get());
        return articleDAO.save(article.get());
    }

    public void notifyCorrespondants(Article article) {
        List<Author> correspondants = article.getCorrespondants() ;
        String message = String.format("Votre article: %s a été soumis pour évaluation. \\n Cordialement.", article.getTitle()) ;
        for (Author correspondant:correspondants ) {
            emailService.sendSimpleMessage(correspondant.getEmail(), "Soumission d'article",  message);
        }
    }

    public void notifyAuthors(Article article) {
        List<Author> correspondants = article.getAuthors() ;
        String message = String.format("Votre article: %s a été publié. \\n Cordialement.", article.getTitle()) ;
        for (Author author:correspondants ) {
            emailService.sendSimpleMessage(author.getEmail(), "Soumission d'article",  message);
        }
    }

}
