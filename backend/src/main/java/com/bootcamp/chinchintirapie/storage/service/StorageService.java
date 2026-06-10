package com.bootcamp.chinchintirapie.storage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;
import com.bootcamp.chinchintirapie.storage.model.StorageFolder;

@Service
@RequiredArgsConstructor
@ConditionalOnBean(S3Client.class)
public class StorageService {

    private final S3Client s3Client;

    @Value("${cloudflare.r2.bucket-name:}")
    private String bucketName;

    @Value("${cloudflare.r2.public-url:}")
    private String publicUrl;

    public String uploadFile(MultipartFile file, StorageFolder folder, String subfolder) {
        if (s3Client == null) {
            throw new RuntimeException("Cloudflare R2 no está configurado en el backend.");
        }

        if (file.isEmpty()) {
            throw new RuntimeException("No se puede subir un archivo vacío.");
        }

        try {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                    ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
                    : "";
            
            // Generar nombre de archivo único
            String prefix = folder.getPath();
            if (subfolder != null && !subfolder.trim().isEmpty()) {
                // Sanitizar subfolder para evitar caracteres raros en la URL
                String safeSubfolder = subfolder.trim().replaceAll("[^a-zA-Z0-9-_]", "_");
                prefix = prefix + "/" + safeSubfolder;
            }
            String uniqueFilename = prefix + "/" + UUID.randomUUID().toString() + extension;

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(uniqueFilename)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // Devolver la URL pública
            String baseUrl = publicUrl;
            if (baseUrl.endsWith("/")) {
                baseUrl = baseUrl.substring(0, baseUrl.length() - 1);
            }
            return baseUrl + "/" + uniqueFilename;

        } catch (IOException e) {
            throw new RuntimeException("Error al leer el archivo para subir a R2", e);
        } catch (Exception e) {
            throw new RuntimeException("Error al subir el archivo a R2: " + e.getMessage(), e);
        }
    }
}
