package com.journal.journalApp.controller;

import java.net.URISyntaxException;
import java.util.Collection;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.journal.journalApp.model.Entry;
import com.journal.journalApp.model.EntryRepository;

@RestController
@RequestMapping("/api")
class EntryController {
	private EntryRepository entryRepository;
	
	public EntryController(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }
	
	@GetMapping("/entries")
    Collection<Entry> entries() {
        return entryRepository.findAll();
    }
	
	@PostMapping("/entry")
    public void createGroup(@Valid @RequestBody Entry entry) throws URISyntaxException {
		System.err.println("***ARE YOU ENTERING THIS*******" + entry.getContent());
        //entryRepository.save(entry);
    }
	
}