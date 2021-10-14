import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskForUpdate, TaskResponse} from '../../interfaces/task.interface';
import {NotificationsComponent} from '../../notifications/notifications.component';

@Component({
    selector: 'app-task-update',
    templateUrl: './task-update.component.html',
    styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent extends NotificationsComponent implements OnInit {
    taskForm: FormGroup;
    id: string;
    favoriteSeason: string;
    statusList: string[] = ['OPEN', 'IN_PROGRESS', 'DONE'];
    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        super();
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.taskForm = this.fb.group({
            title: [],
            description: [],
            status: [],
            typeId: []
        });
        this.onLoadData(this.id);
    }

    onSubmitForm(): void {
        const formValues: TaskForUpdate = this.taskForm.value;
        this.taskService.updateTask(this.id, formValues).subscribe((res: TaskResponse) => {
            if (res.id) {
                this.showNotification('top', 'right', 'success', 'Task Updated!');
                this.router.navigate(['/task-list']);
            } else {
                this.showNotification('top', 'right', 'danger', 'There was an error when creating a new task!');
            }
        })
    }

    onLoadData(id): void {
        this.taskService.getTasksDetails(id).subscribe(res => {
            const task = res;
            this.taskForm.patchValue({
                title: task.title,
                description: task.description,
                status: task.status,
                // typeId: task.typeId
            })
        })
    }

}
