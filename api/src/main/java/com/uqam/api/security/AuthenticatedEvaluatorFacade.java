package com.uqam.api.security;

import com.uqam.api.model.dao.EvaluatorDAO;
import com.uqam.api.model.entity.Evaluator;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class AuthenticatedEvaluatorFacade implements IAuthenticatedEvaluatorFacade {

    private final EvaluatorDAO evaluatorDAO;

    public AuthenticatedEvaluatorFacade(EvaluatorDAO evaluatorDAO) {
        this.evaluatorDAO = evaluatorDAO;
    }

    @Override
    public Evaluator getAuthenticatedEvaluator() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return evaluatorDAO.findByEmail(user.getUsername()).get();
    }
}
