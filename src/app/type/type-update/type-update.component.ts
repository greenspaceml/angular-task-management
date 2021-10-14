import { Component, OnInit } from '@angular/core';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskForUpdate, TaskResponse} from '../../interfaces/task.interface';
import {TypeService} from '../../services/type.service';

@Component({
  selector: 'app-type-update',
  templateUrl: './type-update.component.html',
  styleUrls: ['./type-update.component.css']
})
export class TypeUpdateComponent extends NotificationsComponent implements OnInit {
  typeForm: FormGroup;
  id: string;
  constructor(
      private fb: FormBuilder,
      private typeService: TypeService,
      private router: Router,
      private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.typeForm = this.fb.group({
      title: [],
    });
    this.onLoadData(this.id);
  }

  onSubmitForm(): void {
    const formValues = this.typeForm.value;
    this.typeService.updateType(this.id, formValues).subscribe((res) => {
      if (res.id) {
        this.showNotification('top', 'right', 'success', 'Type Updated!');
        this.router.navigate(['/type-list']);
      } else {
        this.showNotification('top', 'right', 'danger', 'There was an error when creating a new type!');
      }
    })
  }

  onLoadData(id): void {
    this.typeService.getTypeDetails(id).subscribe(res => {
      const type = res;
      this.typeForm.patchValue({
        title: type.title,
      })
    })
  }

}
