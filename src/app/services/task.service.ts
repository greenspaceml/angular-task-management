import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Task, TaskForCreate, TaskForSearch, TaskForUpdate, TaskResponse} from '../interfaces/task.interface';
import {Observable} from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(
        private http: HttpClient
    ) {
    }

    getTasks(data: TaskForSearch): Observable<Task[]> {
        const statusParams = data.status ? 'status=' + data.status : '';
        const searchParams = data.search ? '&search=' + data.search : '';
        return this.http.get<Task[]>(environment.baseUrl + 'tasks?' + statusParams + searchParams);
    }

    createTask(data: TaskForCreate): Observable<TaskResponse> {
        return this.http.post<TaskResponse>(environment.baseUrl + 'tasks', data);
    }

    updateTask(id: string, data: TaskForUpdate): Observable<TaskResponse> {
        return this.http.patch<TaskResponse>(environment.baseUrl + 'tasks/' + id + '/update', data);
    }

    getTasksDetails(id: string): Observable<Task> {
        return this.http.get<Task>(environment.baseUrl + 'tasks/' + id);
    }

    removeTask(id: string): Observable<Task> {
        return this.http.delete<Task>(environment.baseUrl + 'tasks/' + id);
    }
}
