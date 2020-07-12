package com.journal.journalApp.controller;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.journal.journalApp.model.Category;
import com.journal.journalApp.model.CategoryRepository;
import com.journal.journalApp.model.Entry;
import com.journal.journalApp.model.EntryRepository;
import com.journal.journalApp.model.User;
import com.journal.journalApp.model.UserRepository;

@RestController
@RequestMapping("/api")
class EntryController {
	
	@Autowired
	private EntryRepository entryRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public EntryController(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }
	
	@GetMapping("/entries")
    ArrayList<Entry> entries(@AuthenticationPrincipal OAuth2User user) {
        Collection<Entry> entries = entryRepository.findAll();
        ArrayList<Entry> userEntries = new ArrayList<>();
        String userEmail = user.getAttribute("email");
        for(Entry entry : entries){
        	if(entry.getUser() != null){
	        	if(entry.getUser().getEmail().equals(userEmail)){
	        		userEntries.add(entry);
	        	}
        	}
        }
        
        return userEntries;
	}
	
	@DeleteMapping("/entry/{id}")
    public void deleteEntry(@PathVariable Long id) {
        System.err.println("delete entry" + id);
        entryRepository.deleteById(id);
    }

	@PostMapping("/entry")
    public void createEntry(@Valid @RequestBody Entry entry) throws URISyntaxException {
		User user = userRepository.findByEmail(entry.getUser().getEmail());
		
		if(user != null){
			entry.setUser(user);
		}
						
		Date today = new Date();
		Category category = new Category();
		category.setName(entry.getCategory().getName());
		entry.setCategory(category);
		entry.setDateCreated(today);
		entryRepository.save(entry);
    }
	
	@PutMapping("/entry/{id}")
    public void updateEntry(@Valid @RequestBody Entry entry) {
        entryRepository.save(entry);
    }
	
}