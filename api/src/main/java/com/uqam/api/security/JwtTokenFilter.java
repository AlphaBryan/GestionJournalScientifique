package com.uqam.api.security;


import com.uqam.api.model.dao.AdministratorDAO;
import com.uqam.api.model.dao.AuthorDAO;
import com.uqam.api.model.dao.EvaluatorDAO;
import com.uqam.api.model.entity.Administrator;
import com.uqam.api.model.entity.Author;
import com.uqam.api.model.entity.Evaluator;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.apache.logging.log4j.util.Strings.isEmpty;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final AuthorDAO authorDAO;
    private final EvaluatorDAO evaluatorDAO;
    private final AdministratorDAO administratorDAO;

    public JwtTokenFilter(JwtTokenUtil jwtTokenUtil, AuthorDAO authorDAO, EvaluatorDAO evaluatorDAO, AdministratorDAO administratorDAO) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.authorDAO = authorDAO;
        this.evaluatorDAO = evaluatorDAO;
        this.administratorDAO = administratorDAO;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {
        System.out.println("Jwt token filter");

        // Get authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (isEmpty(header) || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        // Get jwt token and validate
        final String token = header.split(" ")[1].trim();
        if (!jwtTokenUtil.validate(token)) {
            chain.doFilter(request, response);
            return;
        }

        Role role = jwtTokenUtil.getRoleFromToken(token);

        UserDetails userDetails;
        if (role == Role.AUTHOR) {
            Optional<Author> author = authorDAO.findByEmail(jwtTokenUtil.getUsernameFromToken(token));
            if (author.isEmpty()) {
                return;
            }
            userDetails = author.get().toUserDetails();
        } else if (role == Role.EVALUATOR) {
            Optional<Evaluator> evaluator = evaluatorDAO.findByEmail(jwtTokenUtil.getUsernameFromToken(token));
            if (evaluator.isEmpty()) {
                return;
            }
            userDetails = evaluator.get().toUserDetails();
        } else if (role == Role.ADMINISTRATOR) {
            Optional<Administrator> administrator = administratorDAO.findByEmail(jwtTokenUtil.getUsernameFromToken(token));
            if (administrator.isEmpty()) {
                return;
            }
            userDetails = administrator.get().toUserDetails();
        } else {
            return;
        }

        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails == null ?
                        List.of() : userDetails.getAuthorities()
        );

        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }
}
