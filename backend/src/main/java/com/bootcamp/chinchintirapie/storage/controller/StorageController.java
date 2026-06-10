package com.bootcamp.chinchintirapie.storage.controller;

import com.bootcamp.chinchintirapie.storage.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.Map;
import com.bootcamp.chinchintirapie.storage.model.StorageFolder;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
@ConditionalOnBean(S3Client.class)
public class StorageController {

    private final StorageService storageService;

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "GENERAL") StorageFolder folder,
            @RequestParam(value = "subfolder", required = false) String subfolder) {
        String url = storageService.uploadFile(file, folder, subfolder);
        return ResponseEntity.ok(Map.of("url", url));
    }
}
