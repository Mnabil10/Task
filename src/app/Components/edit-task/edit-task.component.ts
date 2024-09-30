// src/app/components/edit-task/edit-task.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = +params['id'];
      this.loadTask();
    });
  }

  // Load task details into the form
  loadTask() {
    this.taskService.tasks$.subscribe((tasks) => {
      const task = tasks[this.taskId];
      if (task) {
        this.taskForm.patchValue(task);
      }
    });
  }

  // Submit the form to update the task
  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask: Partial<Task> = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: this.taskForm.value.completed,
      };

      this.taskService.editTask(this.taskId, updatedTask).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
