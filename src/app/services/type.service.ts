import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Task, TaskForCreate, TaskForSearch, TaskForUpdate, TaskResponse, Type, TypeForSearch} from '../interfaces/task.interface';
import {Observable} from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class TypeService {

    constructor(
        private http: HttpClient
    ) {
    }

    getTypes(data: TypeForSearch): Observable<Type[]> {
        const searchParams = data.search ? '&search=' + data.search : '';
        return this.http.get<Type[]>(environment.baseUrl + 'types?' + searchParams);
    }

    createType(data: any): Observable<any> {
        return this.http.post<any>(environment.baseUrl + 'types', data);
    }

    updateType(id: string, data: any): Observable<any> {
        return this.http.patch<any>(environment.baseUrl + 'types/' + id + '/update', data);
    }

    getTypeDetails(id: string): Observable<any> {
        return this.http.get<any>(environment.baseUrl + 'types/' + id);
    }

    removeType(id: string): Observable<any> {
        return this.http.delete<any>(environment.baseUrl + 'types/' + id);
    }
}
