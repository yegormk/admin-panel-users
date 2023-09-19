import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectUserHasRole } from 'src/app/user/state/selectors';
import { UserRoles } from 'src/app/shared/constants/user-roles';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUserHasRole, UserRoles.Admin).pipe(
      tap((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/dashboard/home']);
        }
      }),
    );
  }
}
