import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/user/services/user.service';
import { mainUserActions } from 'src/app/user/state/actions';

@Injectable()
export class UserEffects {
  loadCurrentUser$ = createEffect(() => {
    return this.actions.pipe(
      ofType(mainUserActions.loadCurrentUser),
      switchMap(() => {
        return this.mainUserService.getCurrentUser().pipe(
          map(({ id, roles, name, avatarUrl }) => {
            return mainUserActions.loadedCurrentUser({
              user: { id, roles, name, avatarUrl },
            });
          }),
          catchError((error) => {
            this.snackbarService.openSnackBar(
              `User Loading Failed: ${error.message}`,
            );
            return of(mainUserActions.loadedError());
          }),
        );
      }),
    );
  });

  constructor(
    private actions: Actions,
    private mainUserService: UserService,
    private snackbarService: SnackbarService,
  ) {}
}
