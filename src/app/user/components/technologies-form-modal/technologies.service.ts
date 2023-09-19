import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ITechnology } from 'src/app/shared/interfaces/technology';
import { INewTechnology } from 'src/app/user/components/technologies-form-modal/interfaces/new-technology';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  constructor(private http: HttpClient) {}

  getAllTechnologies(): Observable<ITechnology[]> {
    return this.http.get<ITechnology[]>(`${environment.apiUrl}/technologies`);
  }

  addNewTechnologies(
    newTechnologies: INewTechnology[],
  ): Observable<ITechnology[]> {
    return this.http.post<ITechnology[]>(
      `${environment.apiUrl}/technologies`,
      newTechnologies,
    );
  }

  deleteTechnology(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/technologies/${id}`);
  }
}
