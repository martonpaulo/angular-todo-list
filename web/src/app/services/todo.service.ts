import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    const url = `${this.apiUrl}/todos`;
    return this.http.get<Todo[]>(url);
  }

  deleteTodo(id: string): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }

  createTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/todos`;
    return this.http.post<Todo>(url, todo);
  }
}
