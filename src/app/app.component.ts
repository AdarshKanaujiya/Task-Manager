import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngClass

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Ensure both FormsModule and CommonModule are imported
})
export class AppComponent {
  tasks: { title: string; description: string; completed: boolean }[] = [];
  newTaskTitle = '';
  newTaskDescription = '';
  editIndex: number | null = null; // To track which task is being edited

  // Add a task or update an existing one if in edit mode
  addTask() {
    if (this.newTaskTitle && this.newTaskDescription) {
      if (this.editIndex !== null) {
        this.tasks[this.editIndex] = {
          title: this.newTaskTitle,
          description: this.newTaskDescription,
          completed: false
        };
        this.editIndex = null; // Reset after editing
      } else {
        this.tasks.push({
          title: this.newTaskTitle,
          description: this.newTaskDescription,
          completed: false
        });
      }
      // Clear the input fields
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    }
  }

  // Edit an existing task
  editTask(index: number) {
    const task = this.tasks[index];
    this.newTaskTitle = task.title;
    this.newTaskDescription = task.description;
    this.editIndex = index; // Track the index of the task being edited
  }

  // Delete a task
  deleteTask(index: number) {
    this.tasks.splice(index, 1); // Remove the task at the given index
  }

  // Toggle task completion status
  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }
}
