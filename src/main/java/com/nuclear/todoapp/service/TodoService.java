package com.nuclear.todoapp.service;

import com.nuclear.todoapp.entity.Todo;
import com.nuclear.todoapp.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private  final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAll(){
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo){
       return todoRepository.save(todo);
    }

    public Optional<Todo> getTodo(String id){
        return todoRepository.findById(id);
    }

    public Todo updateTodo(Todo todo){
        return todoRepository.save(todo);
    }

    public void deleteTodo(String id){
        todoRepository.deleteById(id);
    }
}
