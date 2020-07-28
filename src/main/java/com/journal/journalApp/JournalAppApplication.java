package com.journal.journalApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class JournalAppApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(JournalAppApplication.class, args);
	}

}
