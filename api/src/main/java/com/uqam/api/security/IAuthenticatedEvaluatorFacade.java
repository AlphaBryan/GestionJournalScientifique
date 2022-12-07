package com.uqam.api.security;

import com.uqam.api.model.entity.Evaluator;

public interface IAuthenticatedEvaluatorFacade {

    Evaluator getAuthenticatedEvaluator();
}
