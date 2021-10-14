import { Component, OnInit } from '@angular/core';
import {Task, Type} from '../../interfaces/task.interface';
import {TaskService} from '../../services/task.service';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {TypeService} from '../../services/type.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent extends NotificationsComponent implements OnInit {
  types: Type[] = [];

  constructor(
      private typeService: TypeService
  ) {
    super();
  }

  ngOnInit() {
    this.onLoadData();
  }

  removeTask(id: string): void {
    this.typeService.removeType(id).subscribe(res => {
      if (res.id) {
        this.showNotification('top', 'right', 'success', 'Deleted!');
        this.onLoadData();
      } else {
        this.showNotification('top', 'right', 'danger', 'There was an error when creating a new type!');
      }
    })
  }

  onLoadData(): void {
    this.types = [];
    this.typeService.getTypes({}).subscribe(res => {
      this.types = [...res];
    })
  }
}
