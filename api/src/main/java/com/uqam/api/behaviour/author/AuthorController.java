package com.uqam.api.behaviour.author;

import com.uqam.api.dto.AuthorDTO;
import com.uqam.api.mapper.AuthorDTOMapper;
import com.uqam.api.model.entity.Author;
import com.uqam.api.service.AuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("authors")
public class AuthorController {

    private final AuthorService authorService;
    private final AuthorDTOMapper authorDTOMapper;

    public AuthorController(AuthorService authorService, AuthorDTOMapper authorDTOMapper) {
        this.authorService = authorService;
        this.authorDTOMapper = authorDTOMapper;
    }

    @GetMapping("/")
    public ResponseEntity<List<AuthorDTO>> getAuthors() {
        Iterable<Author> authors = authorService.getAll();

        List<AuthorDTO> authorDTOS = new ArrayList<>();
        for (Author author : authors) {
            authorDTOS.add(authorDTOMapper.toAuthorDTO(author));
        }

        return ResponseEntity.ok().body(authorDTOS);
    }
}
