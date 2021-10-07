import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskForCreate, TaskResponse} from '../../interfaces/task.interface';
import {TaskService} from '../../services/task.service';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent extends NotificationsComponent implements OnInit {
    taskForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private router: Router,
    ) {
        super();
    }

    ngOnInit(): void {
        this.taskForm = this.fb.group({
            title: [],
            description: [],
        })
    }

    onSubmitForm(): void {
        const formValues: TaskForCreate = this.taskForm.value;
        this.taskService.createTask(formValues).subscribe((res: TaskResponse) => {
            if (res.id) {
                this.showNotification('top', 'right', 'success', 'Task created!');
                this.router.navigate(['/task-list']);
            } else {
                this.showNotification('top', 'right', 'danger', 'There was an error when creating a new task!');
            }
        })
    }

}
