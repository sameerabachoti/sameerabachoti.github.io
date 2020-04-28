package com.journal.journalApp.model;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
	User findById(String id);
	
	List<User> findAll();
}