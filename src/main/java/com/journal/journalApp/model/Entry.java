package com.journal.journalApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

import java.util.Date;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class Entry{
	@Id
    @GeneratedValue
    private Long id;
	
	private String title;
	private String content;
	private Date dateCreated;
	private Date dateModified;
	
	@ManyToOne(cascade=CascadeType.PERSIST)
    private Category category;
	
	@ManyToOne(cascade=CascadeType.PERSIST)
	private  User user;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Date getDateModified() {
		return dateModified;
	}

	public void setDateModified(Date dateModified) {
		this.dateModified = dateModified;
	}
}