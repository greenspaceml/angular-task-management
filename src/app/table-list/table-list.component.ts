import {Component, OnInit} from '@angular/core';
import {TaskService} from '../services/task.service';
import {Task} from '../interfaces/task.interface';
import {NotificationsComponent} from '../notifications/notifications.component';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent extends NotificationsComponent implements OnInit {
    taskList: Task[] = [];

    constructor(
        private taskService: TaskService
    ) {
        super();
    }

    ngOnInit() {
        this.onLoadData();
    }

    removeTask(id: string): void {
        this.taskService.removeTask(id).subscribe(res => {
            if (res.id) {
                this.showNotification('top', 'right', 'success', 'Deleted!');
                this.onLoadData();
            } else {
                this.showNotification('top', 'right', 'danger', 'There was an error when creating a new task!');
            }
        })
    }

    onLoadData(): void {
        this.taskList = [];
        this.taskService.getTasks({}).subscribe(res => {
            this.taskList = [...res];
        })
    }

}
