package com.journal.journalApp.controller;

import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.journal.journalApp.model.Category;
import com.journal.journalApp.model.CategoryRepository;
import com.journal.journalApp.model.Entry;
import com.journal.journalApp.model.EntryRepository;
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
    Collection<Entry> entries() {
        return entryRepository.findAll();
    }

	@PostMapping("/entry")
    public void createEntry(@Valid @RequestBody Entry entry) throws URISyntaxException {
		Date today = new Date();
		Category category = new Category();
		category.setName(entry.getCategory().getName());
		entry.setCategory(category);
		entry.setDateCreated(today);
		entryRepository.save(entry);
		//User user = userRepository.findById("1");
    }
	
}