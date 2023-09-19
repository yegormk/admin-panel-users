import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';

import { ITechnology } from 'src/app/shared/interfaces/technology';
import { IUserDetails } from 'src/app/shared/interfaces/user-details';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TechnologiesService } from 'src/app/user/components/technologies-form-modal/technologies.service';
import { userProfileActions } from 'src/app/user/components/user-profile/state/actions';
import { selectUserId } from 'src/app/user/components/user-profile/state/selectors';
import { UserService } from 'src/app/user/services/user.service';

@Injectable()
export class UserProfileEffects {
  loadUser$ = createEffect(() => {
    return this.actions.pipe(
      ofType(userProfileActions.loadUser),
      switchMap(({ id }) => {
        return this._userService.getUserById(id).pipe(
          map((user: IUserDetails) => {
            return userProfileActions.loadedUser({ user });
          }),
          catchError((error) => {
            this._snackbarService.openSnackBar(
              'Something went wrong when loading the user...',
            );
            return of(userProfileActions.error({ error }));
          }),
        );
      }),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions.pipe(
      ofType(userProfileActions.updateUser),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([{ user }, id = '']) => {
        return this._userService.updateUserById(id, user).pipe(
          map((user: IUserDetails) => {
            this._snackbarService.openSnackBar(
              'User profile has been successfully updated',
            );
            return userProfileActions.updatedUser({ user });
          }),
          catchError((error) => {
            this._snackbarService.openSnackBar(
              'Something went wrong when updating the user...',
            );
            return of(userProfileActions.error({ error }));
          }),
        );
      }),
    );
  });

  updateUserTechnologies$ = createEffect(() => {
    return this.actions.pipe(
      ofType(userProfileActions.updateUserTechnologies),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([{ technologies }, userId = '']) => {
        const newTechnologies = technologies.filter(
          (technology) => !('id' in technology),
        );
        const existingTechnologies = technologies.filter(
          (technology) => 'id' in technology,
        ) as ITechnology[];

        const newTechnologies$ = newTechnologies.length
          ? this._technologiesService.addNewTechnologies(newTechnologies)
          : of([]);
        return newTechnologies$.pipe(
          switchMap((addedTechnologies: ITechnology[]) => {
            const technologiesIds = [
              ...addedTechnologies,
              ...existingTechnologies,
            ].map(({ id }) => String(id));
            return this._userService
              .updateUserTechnologies({
                userId,
                technologyId: technologiesIds,
              })
              .pipe(
                map((updatedTechnologies: ITechnology[]) => {
                  this._snackbarService.openSnackBar(
                    'User technologies have been successfully updated',
                  );
                  return userProfileActions.updatedUserTechnologies({
                    updatedTechnologies,
                  });
                }),
                catchError((error) => {
                  this._snackbarService.openSnackBar(
                    'Something went wrong when updating user technologies...',
                  );
                  return of(userProfileActions.error({ error }));
                }),
              );
          }),
        );
      }),
    );
  });

  constructor(
    private store: Store,
    private actions: Actions,
    private _userService: UserService,
    private _snackbarService: SnackbarService,
    private _technologiesService: TechnologiesService,
  ) {}
}
