package com.bootcamp.chinchintirapie;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class BackendApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure()
                .directory("../")
                .ignoreIfMissing()
                .load();

        dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));

        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner autoMigrate(JdbcTemplate jdbcTemplate) {
        return args -> {
            System.out.println("===== RUNNING DB MIGRATIONS =====");
            try {
                jdbcTemplate.execute("ALTER TABLE multimedia ADD COLUMN view_count bigint DEFAULT 0");
                System.out.println("=> Column view_count added to multimedia");
            } catch(Exception e) {
                System.out.println("=> multimedia view_count already exists or error: " + e.getMessage());
            }
            try {
                jdbcTemplate.execute("ALTER TABLE articulos ADD COLUMN view_count bigint DEFAULT 0");
                System.out.println("=> Column view_count added to articulos");
            } catch(Exception e) {
                System.out.println("=> articulos view_count already exists or error: " + e.getMessage());
            }
            
            try {
                jdbcTemplate.execute("UPDATE multimedia SET view_count = 0 WHERE view_count IS NULL");
                jdbcTemplate.execute("UPDATE articulos SET view_count = 0 WHERE view_count IS NULL");
            } catch(Exception e) {
                // ignore
            }
            System.out.println("=================================");
        };
    }
}