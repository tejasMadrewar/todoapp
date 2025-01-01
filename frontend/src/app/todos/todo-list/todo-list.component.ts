import { TodoInterface } from './../types/todo.interface';
import { TodosService } from './../todos.service';
import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, CommonModule],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  editingId: string | null = null;
  isAllTodosSelected$: Observable<boolean>;
  noTodoClass$: Observable<boolean>;

  constructor(private todosService: TodosService) {
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.completed))
    );

    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.completed);
        } else if (filter == FilterEnum.completed) {
          return todos.filter((todo) => todo.completed);
        }
        return todos;
      })
    );
  }

  setEditingId(editingId: string | null): void {
    console.log('settting edit todo', editingId);
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
