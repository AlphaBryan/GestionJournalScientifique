package com.uqam.api.behaviour.edition;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

public class UpdateEditionRequest {

    @NotNull
    @Size(min = 3, max = 20)
    private String name;

    @NotNull
    private Timestamp submissionLimitDate;

    public String getName() {
        return name;
    }

    public Timestamp getSubmissionLimitDate() {
        return submissionLimitDate;
    }
}
