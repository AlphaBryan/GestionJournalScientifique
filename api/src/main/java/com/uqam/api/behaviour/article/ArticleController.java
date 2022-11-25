package com.uqam.api.behaviour.article;

import com.uqam.api.dto.ArticleDTO;
import com.uqam.api.mapper.ArticleDTOMapper;
import com.uqam.api.model.dao.*;
import com.uqam.api.model.entity.*;
import com.uqam.api.security.AuthenticatedAuthorFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("articles")
public class ArticleController {

    private final CategoryDAO categoryDAO;
    private final AuthorDAO authorDAO;
    private final ArticleDAO articleDAO;
    private final ScientificCommitteeDAO scientificCommitteeDAO;
    private final EditionDAO editionDAO;
    private final AuthenticatedAuthorFacade authenticatedAuthor;
    private final ArticleDTOMapper articleDTOMapper;

    public ArticleController(
            CategoryDAO categoryDAO,
            AuthorDAO authorDAO,
            ArticleDAO articleDAO,
            ScientificCommitteeDAO scientificCommitteeDAO,
            EditionDAO editionDAO,
            AuthenticatedAuthorFacade authenticatedAuthor,
            ArticleDTOMapper articleDTOMapper
    ) {
        this.categoryDAO = categoryDAO;
        this.authorDAO = authorDAO;
        this.articleDAO = articleDAO;
        this.scientificCommitteeDAO = scientificCommitteeDAO;
        this.editionDAO = editionDAO;
        this.authenticatedAuthor = authenticatedAuthor;
        this.articleDTOMapper = articleDTOMapper;
    }

    @PostMapping("/")
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody @Valid CreateArticleRequest request) {
        Author currentAuthor = authenticatedAuthor.getAuthenticatedAuthor();

        Set<Category> categories = new HashSet<>();
        for (Integer categoryId : request.getCategoriesId()) {
            Optional<Category> category = categoryDAO.findById(categoryId);
            if (category.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            categories.add(category.get());
        }

        List<Author> authors = new ArrayList<>();
        authors.add(currentAuthor);
        for (Integer authorId : request.getAuthorsId()) {
            Optional<Author> author = authorDAO.findById(authorId);
            if (author.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            authors.add(author.get());
        }

        Version version = new Version(request.getText());

        Article article = articleDAO.save(new Article(request.getTitle(), categories, authors, version));

        return ResponseEntity
                .ok()
                .body(articleDTOMapper.toArticleDTO(article));
    }

    @GetMapping("/author/{authorId}/articles")
    public ResponseEntity<List<ArticleDTO>> getAuthorArticles(@PathVariable("authorId") Integer authorId) {
        Optional<Author> author = authorDAO.findById(authorId);
        if (author.isEmpty()) return ResponseEntity.badRequest().build();
        Iterable<Article> articles = articleDAO.findArticlesByAuthor(author.get());

        List<ArticleDTO> articleDTOS = new ArrayList<>();
        for (Article article : articles) {
            articleDTOS.add(articleDTOMapper.toArticleDTO(article));
        }

        return ResponseEntity.ok().body(articleDTOS);
    }

    @GetMapping("/committee/{committeeId}/articles")
    public ResponseEntity<List<ArticleDTO>> getCommitteeArticles(@PathVariable("committeeId") Integer committeeId) {
        Optional<ScientificCommittee> scientificCommittee = scientificCommitteeDAO.findById(committeeId);
        if (scientificCommittee.isEmpty()) return ResponseEntity.badRequest().build();

        List<ArticleDTO> articleDTOS = new ArrayList<>();
        for (Article article : scientificCommittee.get().getArticles()) {
            articleDTOS.add(articleDTOMapper.toArticleDTO(article));
        }

        return ResponseEntity.ok().body(articleDTOS);
    }

    @GetMapping("/edition/{editionId}/articles")
    public ResponseEntity<List<ArticleDTO>> getEditionArticles(@PathVariable("editionId") Integer editionId) {
        Optional<Edition> edition = editionDAO.findById(editionId);
        if (edition.isEmpty()) return ResponseEntity.badRequest().build();

        List<ArticleDTO> articleDTOS = new ArrayList<>();
        for (Article article : edition.get().getArticles()) {
            articleDTOS.add(articleDTOMapper.toArticleDTO(article));
        }

        return ResponseEntity.ok().body(articleDTOS);
    }
}
