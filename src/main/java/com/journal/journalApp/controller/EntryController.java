package com.journal.journalApp.controller;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
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
	
}