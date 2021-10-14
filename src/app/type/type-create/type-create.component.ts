import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskForCreate, TaskResponse, Type} from '../../interfaces/task.interface';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {TypeService} from '../../services/type.service';
import {NotificationsComponent} from '../../notifications/notifications.component';

@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.css']
})
export class TypeCreateComponent extends NotificationsComponent implements OnInit {
  typeForm: FormGroup;
  types: Type[] = [];

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private typeService: TypeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.typeForm = this.fb.group({
      title: [],
    })
  }

  onSubmitForm(): void {
    const formValues: TaskForCreate = this.typeForm.value;
    this.typeService.createType(formValues).subscribe((res) => {
      if (res.id) {
        this.showNotification('top', 'right', 'success', 'Task created!');
        this.router.navigate(['/type-list']);
      } else {
        this.showNotification('top', 'right', 'danger', 'There was an error when creating a new task!');
      }
    })
  }
}
