import { TodosService } from './../todos.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  text: string = '';

  constructor(private todosService: TodosService) {}

  changeText(event: Event) {
    console.log('change text');
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    if (this.text !== '') {
      console.log('Adding todo:' + this.text);
      this.todosService.addTodo(this.text).subscribe();
      this.text = '';
    }
  }
}
