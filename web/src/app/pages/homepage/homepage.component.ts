import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { TodoSearchService } from 'src/app/services/todo-search.service';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Todo>();
  displayedColumns: string[] = [
    'description',
    'dueDate',
    'priority',
    'actions',
  ];

  canCreateNew = false;
  newTodo: Todo = {
    id: '',
    description: '',
    dueDate: '',
    priority: '',
  };

  private destroy$ = new Subject<void>();

  constructor(
    private todoService: TodoService,
    private todoSearchService: TodoSearchService
  ) {}

  ngOnInit(): void {
    this.getTodos();
    this.subscribeToFilteredTodos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.updateDataSource(todos);
      this.todoSearchService.setTodos(todos);
    });
  }

  updateDataSource(todos: Todo[]): void {
    this.dataSource.data = todos;
  }

  subscribeToFilteredTodos(): void {
    this.todoSearchService.filteredTodos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filteredTodos) => {
        this.updateDataSource(filteredTodos);
      });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.getTodos();
    });
  }

  createTodo(): void {
    this.todoService.createTodo(this.newTodo).subscribe((createdTodo) => {
      this.getTodos();
      this.clearNewTodo();
    });
  }

  clearNewTodo(): void {
    this.newTodo = {
      id: '',
      description: '',
      dueDate: '',
      priority: '',
    };
  }

  isCreateButtonEnabled(): boolean {
    return (
      this.newTodo.description !== '' &&
      this.newTodo.dueDate !== '' &&
      this.newTodo.priority !== ''
    );
  }

  isSearchButtonEnabled(): boolean {
    return this.newTodo.description !== '' || this.newTodo.priority !== '';
  }

  applyFilter(): void {
    this.todoSearchService.filter(
      this.newTodo.description,
      this.newTodo.priority
    );
  }
}
