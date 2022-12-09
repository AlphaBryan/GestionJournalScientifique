package com.uqam.api.behaviour.authentication;

import com.uqam.api.dto.AdministratorDTO;
import com.uqam.api.mapper.AdministratorDTOMapper;
import com.uqam.api.model.dao.AdministratorDAO;
import com.uqam.api.model.entity.Administrator;
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
@RequestMapping("auth/administrator")
public class AuthAdminController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final AdministratorDAO administratorDAO;
    private final AdministratorDTOMapper administratorDTOMapper;

    public AuthAdminController(PasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil, AdministratorDAO administratorDAO, AdministratorDTOMapper administratorDTOMapper) {
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.administratorDAO = administratorDAO;
        this.administratorDTOMapper = administratorDTOMapper;
    }

    @PostMapping("login")
    public ResponseEntity<AdministratorDTO> loginAdministrator(@RequestBody @Valid LoginRequest request) {
        Optional<Administrator> administrator = administratorDAO.findByEmail(request.getEmail());
        if (administrator.isEmpty() || !passwordEncoder.matches(request.getPassword(), administrator.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity
                .ok()
                .header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateToken(administrator.get().toUserDetails()))
                .body(administratorDTOMapper.toAdministratorDTO(administrator.get()));
    }

}
