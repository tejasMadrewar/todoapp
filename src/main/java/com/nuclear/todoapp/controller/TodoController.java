package com.nuclear.todoapp.controller;

import com.nuclear.todoapp.entity.Todo;
import com.nuclear.todoapp.service.TodoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("")
    public List<Todo> getAll(){
        return todoService.getAll();
    }

    @PostMapping("")
    public Todo createTodo(@RequestBody Todo todo){
        return todoService.createTodo(todo);
    }

    @GetMapping("{id}")
    public Todo getTodo(@PathVariable String id){
        return todoService.getTodo(id).orElseThrow(()->new RuntimeException("Todo not found") );
    }

    @PutMapping("{id}")
    public Todo updateTodo(@PathVariable String id,@RequestBody Todo newTodo){
        Todo todo=  todoService.getTodo(id).orElseThrow(()->new RuntimeException("Todo not found") );
        todo.setCompleted(newTodo.getCompleted());
        todo.setTitle(newTodo.getTitle());
        return todoService.updateTodo(todo);

    }
    @DeleteMapping("{id}")
    public void deleteMapping(@PathVariable String id){
        todoService.deleteTodo(id);
    }

}
