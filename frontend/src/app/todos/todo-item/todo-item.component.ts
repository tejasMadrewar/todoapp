import { TodosService } from './../todos.service';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoInterface } from '../types/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();

  isEditing: boolean = false;

  editingText: string = '';
  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.title;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('changes', changes);
    if (changes['isEditingProps']?.currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  toggleTodo() {
    this.todosService.toggleTodo(this.todoProps).subscribe();
  }

  removeTodo() {
    this.todosService.removeTodo(this.todoProps.id).subscribe();
  }

  setTodoInEditMode() {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  changeText(event: Event) {
    const value = (event?.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('changeText');
  }

  changeTodo() {
    console.log('changeTodo');
    this.todosService.changeTodo(this.todoProps, this.editingText).subscribe();
    this.setEditingIdEvent.emit(null);
  }
}
