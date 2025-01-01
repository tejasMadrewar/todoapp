import { TodosService } from '../todos.service';
import { Component, inject } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../types/filter.enum';

@Component({
  selector: 'app-todo-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodos$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todosService: TodosService) {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.completed).length)
    );

    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );

    this.noTodos$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    this.filter$ = this.todosService.filter$;
  }

  changeFilter($event: Event, filterName: FilterEnum) {
    event?.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
