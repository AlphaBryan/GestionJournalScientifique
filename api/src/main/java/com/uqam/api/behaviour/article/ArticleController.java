package com.uqam.api.behaviour.article;

import com.uqam.api.dto.ArticleDTO;
import com.uqam.api.mapper.ArticleDTOMapper;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Author;
import com.uqam.api.model.entity.Evaluation;
import com.uqam.api.model.entity.Evaluator;
import com.uqam.api.security.AuthenticatedAuthorFacade;
import com.uqam.api.security.AuthenticatedEvaluatorFacade;
import com.uqam.api.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("articles")
public class ArticleController {

    private final ArticleService articleService;
    private final AuthenticatedAuthorFacade authenticatedAuthor;
    private final AuthenticatedEvaluatorFacade authenticatedEvaluator;
    private final ArticleDTOMapper articleDTOMapper;

    public ArticleController(ArticleService articleService, AuthenticatedAuthorFacade authenticatedAuthor, AuthenticatedEvaluatorFacade authenticatedEvaluator, ArticleDTOMapper articleDTOMapper) {
        this.articleService = articleService;
        this.authenticatedAuthor = authenticatedAuthor;
        this.authenticatedEvaluator = authenticatedEvaluator;
        this.articleDTOMapper = articleDTOMapper;
    }

    @PreAuthorize("hasRole('AUTHOR')")
    @PostMapping("/")
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody @Valid CreateArticleRequest request) {
        Author currentAuthor = authenticatedAuthor.getAuthenticatedAuthor();

        Article article = articleService.create(request.getTitle(), request.getText(), currentAuthor, request.getCategoriesId(), request.getAuthorsId());

        if (article == null) return ResponseEntity.badRequest().build();

        return ResponseEntity
                .ok()
                .body(articleDTOMapper.toArticleDTO(article));
    }

    @GetMapping("/author/{authorId}/articles")
    public ResponseEntity<List<ArticleDTO>> getAuthorArticles(@PathVariable("authorId") Integer authorId) {
        Iterable<Article> articles = articleService.getByAuthor(authorId);
        if (articles == null) return ResponseEntity.notFound().build();


        List<ArticleDTO> articleDTOS = new ArrayList<>();
        for (Article article : articles) {
            articleDTOS.add(articleDTOMapper.toArticleDTO(article));
        }

        return ResponseEntity.ok().body(articleDTOS);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EVALUATOR')")
    @GetMapping("/committee/{committeeId}/articles")
    public ResponseEntity<List<ArticleDTO>> getCommitteeArticles(@PathVariable("committeeId") Integer committeeId) {
        Iterable<Article> articles = articleService.getByScientificCommittee(committeeId);
        if (articles == null) return ResponseEntity.notFound().build();

        List<ArticleDTO> articleDTOS = new ArrayList<>();
        for (Article article : articles) {
            articleDTOS.add(articleDTOMapper.toArticleDTO(article));
        }

        return ResponseEntity.ok().body(articleDTOS);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edition/{editionId}/articles")
    public ResponseEntity<List<ArticleDTO>> getEditionArticles(@PathVariable("editionId") Integer editionId) {
        Iterable<Article> articles = articleService.getByEdition(editionId);
        if (articles == null) return ResponseEntity.notFound().build();

        List<ArticleDTO> articleDTOS = new ArrayList<>();
        for (Article article : articles) {
            articleDTOS.add(articleDTOMapper.toArticleDTO(article));
        }

        return ResponseEntity.ok().body(articleDTOS);
    }

    @PreAuthorize("hasRole('EVALUATOR') && canEvaluate(#articleId)")
    @PostMapping("/{articleId}/{versionId}/evaluate")
    public ResponseEntity<Object> evaluateArticleVersion(@PathVariable("articleId") Integer articleId, @PathVariable("versionId") Integer versionId, @RequestBody @Valid EvaluateArticleVersionRequest request) {
        Evaluator evaluator = authenticatedEvaluator.getAuthenticatedEvaluator();

        Evaluation evaluation = articleService.evaluate(versionId, articleId, request.getRate(), request.getComment(), request.isCommentMajor(), evaluator);
        if (evaluation == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('EVALUATOR') && canEvaluate(#articleId)")
    @PutMapping("/{articleId}/ready")
    public ResponseEntity<ArticleDTO> articleReady(@PathVariable("articleId") Integer articleId) {
        Article article = articleService.ready(articleId);
        if (article == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok().body(articleDTOMapper.toArticleDTO(article));
    }
}
