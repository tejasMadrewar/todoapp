package com.nuclear.todoapp.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Todo {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "title")
    private String title;
    @Column(name="completed")
    private Boolean  completed;

    public Todo(){}

    public Todo(String id, String title, Boolean completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
