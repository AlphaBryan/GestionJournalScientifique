package com.uqam.api.service;

import com.uqam.api.model.dao.ArticleDAO;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Version;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
public class VersionService {
    private final ArticleDAO articleDAO;
    @Value("${directory_upload}")
    private String directory_upload;

    public VersionService(ArticleDAO articleDAO) {
        this.articleDAO = articleDAO;
    }


    public Article createVersion(Integer articleID, MultipartFile file) {
        Optional<Article> article = articleDAO.findById(articleID);
        if (article.isEmpty()) return null;
        return createVersion(article.get(), file);
    }

    public Article createVersion(Article article, MultipartFile file) {
        String fileName = file.getOriginalFilename();

        String extension = FilenameUtils.getExtension(fileName);
        String versionName = UUID.randomUUID() + "." + extension;
        try {
            file.transferTo(new File(directory_upload + versionName));
        } catch (IOException e) {
            System.out.println(e);
            return null;
        }
        Version version = new Version(versionName);
        article.addVersion(version);
        return articleDAO.save(article);
    }

}
