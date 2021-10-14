import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {TaskCreateComponent} from '../../task/task-create/task-create.component';
import {TaskUpdateComponent} from '../../task/task-update/task-update.component';
import {TypeListComponent} from '../../type/type-list/type-list.component';
import {TypeCreateComponent} from '../../type/type-create/type-create.component';
import {TypeUpdateComponent} from '../../type/type-update/type-update.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'task-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'task-create',        component: TaskCreateComponent },
    { path: 'task-update/:id',        component: TaskUpdateComponent },
    { path: 'type-list',        component: TypeListComponent },
    { path: 'type-create',        component: TypeCreateComponent },
    { path: 'type-update/:id',        component: TypeUpdateComponent },
];
