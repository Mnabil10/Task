// src/app/models/task.model.ts
export interface Task {
    title: string;
    description: string;
    completed: boolean;
    createdDate?: Date; // Optional property for the created date
  }
  