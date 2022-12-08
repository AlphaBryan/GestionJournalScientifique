package com.uqam.api.behaviour.authentication;

import com.uqam.api.dto.AuthorDTO;
import com.uqam.api.mapper.AuthorDTOMapper;
import com.uqam.api.model.dao.AuthorDAO;
import com.uqam.api.model.entity.Author;
import com.uqam.api.security.JwtTokenUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping(path = "auth/author")
public class AuthAuthorController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthorDTOMapper authorDTOMapper;
    private final AuthorDAO authorDAO;

    public AuthAuthorController(PasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil, AuthorDTOMapper authorDTOMapper, AuthorDAO authorDAO) {
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authorDTOMapper = authorDTOMapper;
        this.authorDAO = authorDAO;
    }

    @PostMapping("register")
    public ResponseEntity<AuthorDTO> registerAuthor(@RequestBody @Valid RegisterAuthorRequest request) {
        if (authorDAO.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().build();
        }
        Author author = authorDAO.save(new Author(request.getFirstName(), request.getLastName(), request.getEmail(), passwordEncoder.encode(request.getPassword())));

        return ResponseEntity
                .ok()
                .header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateToken(author.toUserDetails()))
                .body(authorDTOMapper.toAuthorDTO(author));
    }

    @PostMapping("login")
    public ResponseEntity<AuthorDTO> loginAuthor(@RequestBody @Valid LoginRequest request) {
        System.out.println("Auth author");
        Optional<Author> author = authorDAO.findByEmail(request.getEmail());
        System.out.println(author.isEmpty());
        if (author.isEmpty() || !passwordEncoder.matches(request.getPassword(), author.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity
                .ok()
                .header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateToken(author.get().toUserDetails()))
                .body(authorDTOMapper.toAuthorDTO(author.get()));
    }

}
