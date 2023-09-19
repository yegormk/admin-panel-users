import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IUserDetails } from 'src/app/shared/interfaces/user-details';
import { IUpdateUserDTO } from 'src/app/user/components/user-profile/interfaces/update-user-dto';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { IGetUsersResponse } from 'src/app/user/components/user-profile/interfaces/get-users-response';
import { IAssignTechnologiesToUserDTO } from 'src/app/user/components/technologies-form-modal/interfaces/assign-technology-dto';
import { ITechnology } from 'src/app/shared/interfaces/technology';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  getUserById(id: string): Observable<IUserDetails> {
    return this.http.get<IUserDetails>(`${environment.apiUrl}/users/${id}`);
  }

  getAllUsers(): Observable<IGetUsersResponse> {
    return this.http.get<IGetUsersResponse>(`${environment.apiUrl}/users`);
  }

  updateUserById(id: string, body: IUpdateUserDTO): Observable<IUserDetails> {
    return this.http.patch<IUserDetails>(
      `${environment.apiUrl}/users/${id}`,
      body,
    );
  }

  getCurrentUser(): Observable<IUserDetails> {
    const id = this.localStorageService.getData('id');
    if (id) {
      return this.getUserById(id);
    } else {
      throw throwError(() => new Error('Could not get current user id'));
    }
  }

  updateUserTechnologies(
    technologies: IAssignTechnologiesToUserDTO,
  ): Observable<ITechnology[]> {
    return this.http.post<ITechnology[]>(
      `${environment.apiUrl}/users/technology`,
      technologies,
    );
  }
}
