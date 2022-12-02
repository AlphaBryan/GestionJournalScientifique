package com.uqam.api.behaviour.authentication;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class LoginRequest {

    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
