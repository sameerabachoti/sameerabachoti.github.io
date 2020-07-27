package com.journal.journalApp.model;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EntryRepository extends JpaRepository<Entry, Long> {
	List<Entry> findByUserId(Long userId);
	
	List<Entry> findAll();
	
	List<Entry> findAllByUserId(String id);
	
	public Optional<Entry> findById(Long id);
}