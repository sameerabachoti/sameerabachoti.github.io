package com.journal.journalApp.model;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EntryRepository extends JpaRepository<Entry, Long> {
	List<Entry> findByUserId(String userId);
	
	List<Entry> findAll();
}