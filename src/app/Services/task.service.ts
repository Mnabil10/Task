// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());
  tasks$ = this.tasksSubject.asObservable();

  // Add a new task
  addTask(task: Task) {
    const tasks = this.tasksSubject.getValue();
    tasks.push(task);
    this.updateTasks(tasks);
  }

  // Edit an existing task
  editTask(index: number, updatedTask: Partial<Task>): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const tasks = this.tasksSubject.getValue();
        if (index >= 0 && index < tasks.length) {
          tasks[index] = { ...tasks[index], ...updatedTask };
          this.updateTasks(tasks);
          resolve();
        } else {
          reject(new Error('Task index out of bounds'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // Delete a task
  deleteTask(index: number) {
    const tasks = this.tasksSubject.getValue();
    tasks.splice(index, 1);
    this.updateTasks(tasks);
  }

  // Toggle task status
  toggleTaskStatus(index: number) {
    const tasks = this.tasksSubject.getValue();
    tasks[index].completed = !tasks[index].completed;
    this.updateTasks(tasks);
  }

  // Update tasks in localStorage
  private updateTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  private loadTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
}
