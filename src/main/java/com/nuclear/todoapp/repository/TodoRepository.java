package com.nuclear.todoapp.repository;

import com.nuclear.todoapp.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo,String> {

}
