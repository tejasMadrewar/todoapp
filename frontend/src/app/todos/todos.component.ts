import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-todos',
  imports: [HeaderComponent, TodoListComponent, FooterComponent],
  templateUrl: './todos.component.html',
})
export class TodosComponent {}
