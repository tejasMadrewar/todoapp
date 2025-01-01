import { Injectable } from '@angular/core';
import { TodoInterface } from './types/todo.interface';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { FilterEnum } from './types/filter.enum';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TodoItemComponent } from './todo-item/todo-item.component';

@Injectable({ providedIn: 'root' })
export class TodosService {
  todos$: Observable<TodoInterface[]>;
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  private readonly apiUrl = 'http://localhost:8080/todos';
  http: HttpClient;
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(http: HttpClient) {
    this.http = http;
    this.todos$ = this.refreshTrigger$.pipe(
      switchMap(() => this.http.get<TodoInterface[]>(this.apiUrl)),
      map((data) => data || []),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}, message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  refreshTodos(): void {
    this.refreshTrigger$.next();
  }

  addTodo(title: string) {
    const todo: TodoInterface = {
      title,
      completed: false,
      id: Math.random().toString(16),
    };

    return this.http
      .post<TodoInterface>(this.apiUrl, todo)
      .pipe(map(() => this.refreshTodos()));
  }

  removeTodo(id: string) {
    console.log('removeTodo:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.refreshTodos();
      }),
      catchError(this.handleError)
    );
  }

  clearCompleted(): void {
    //this.todos = this.todos.filter((todo) => !todo.completed);
  }

  toggleAll(completed: boolean): void {}

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  changeTodo(todo: TodoInterface, newTitle: string) {
    if (todo) {
      const newTodo = { ...todo, title: newTitle };
      const url = `${this.apiUrl}/${newTodo.id}`;
      return this.http.put<TodoInterface>(url, newTodo).pipe(
        tap(() => {
          this.refreshTodos();
        })
      );
    } else {
      throw new Error('Todo not found.');
    }
  }

  toggleTodo(todo: TodoInterface) {
    console.log('Toggle', todo);
    if (todo) {
      const newTodo = { ...todo, completed: !todo.completed };
      const url = `${this.apiUrl}/${newTodo.id}`;
      return this.http.put<TodoInterface>(url, newTodo).pipe(
        tap(() => {
          this.refreshTodos();
        })
      );
    } else {
      throw new Error('Todo not found.');
    }
  }

  setFilter(filter: FilterEnum) {
    console.log('setting filter:', filter);
    this.filter$.next(filter);
  }
}
