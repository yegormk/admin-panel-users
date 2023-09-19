import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IUpdateUserEducationItemDTO } from 'src/app/user/components/user-profile/interfaces/update-user-education-item-dto';
import { IUserEducationDetails } from 'src/app/shared/interfaces/user-education';

@Injectable({
  providedIn: 'root',
})
export class UserEducationService {
  constructor(private http: HttpClient) {}

  addUserEduction(
    educationItem: IUpdateUserEducationItemDTO,
  ): Observable<IUserEducationDetails> {
    return this.http.post<IUserEducationDetails>(
      `${environment.apiUrl}/education-infos`,
      educationItem,
    );
  }

  removeUserEduction(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/education-infos/${id}`,
    );
  }

  updateUserEducationById(
    id: number,
    educationItem: IUpdateUserEducationItemDTO,
  ): Observable<IUserEducationDetails> {
    return this.http.patch<IUserEducationDetails>(
      `${environment.apiUrl}/education-infos/${id}`,
      educationItem,
    );
  }
}
