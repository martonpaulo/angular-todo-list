import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoSearchService {
  private todos: Todo[] = [];
  private filteredTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  filteredTodos$: Observable<Todo[]> = this.filteredTodosSubject.asObservable();

  constructor() {}

  setTodos(todos: Todo[]): void {
    this.todos = todos;
    this.filteredTodosSubject.next(todos);
  }

  filter(description: string, priority: string): void {
    let filteredTodos: Todo[] = this.todos;

    if (description.length) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.description.toLowerCase().includes(description.toLowerCase())
      );
    }

    if (priority.length) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.priority.toLowerCase() === priority.toLowerCase()
      );
    }

    this.filteredTodosSubject.next(filteredTodos);
  }
}
