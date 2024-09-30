// src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: string = 'all'; // Default filter option

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilter(); // Apply filter when tasks are loaded
    });
  }

  // Update filter option and apply filtering
  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }

  // Apply the filter to the tasks
  applyFilter() {
    switch (this.filter) {
      case 'completed':
        this.filteredTasks = this.tasks.filter(task => task.completed);
        break;
      case 'pending':
        this.filteredTasks = this.tasks.filter(task => !task.completed);
        break;
      default:
        this.filteredTasks = this.tasks; // Show all tasks
    }
  }

  // Call this method to delete a task
  deleteTask(index: number) {
    this.taskService.deleteTask(index);
  }
}
