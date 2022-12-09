package com.uqam.api.service;

import com.uqam.api.model.dao.*;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Version;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Component
public class VersionService {
    @Value( "${directory_upload}" )
    private String directory_upload ;
    private final ArticleDAO articleDAO;

    private final ArticleService  articleService;

    public VersionService(ArticleDAO articleDAO, ArticleService articleService) {
        this.articleDAO = articleDAO;
        this.articleService = articleService;
    }


    public Article createVersion (Integer articleID , MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename() ;
        String extension = fileName.split(".")[fileName.split(".").length-1] ;
        String versionName = UUID.randomUUID().toString() + "." + extension;
        file.transferTo( new File(directory_upload + versionName));
        Article article = articleService.getById(articleID).get();
        Version version = new Version(versionName) ;
        article.addVersion(version);
        return   articleDAO.save(article) ;
    }


}
