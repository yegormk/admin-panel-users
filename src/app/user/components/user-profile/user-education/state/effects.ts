import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';

import { IUserEducationDetails } from 'src/app/shared/interfaces/user-education';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { userProfileActions } from 'src/app/user/components/user-profile/state/actions';
import { selectUserId } from 'src/app/user/components/user-profile/state/selectors';
import { userEducationActions } from 'src/app/user/components/user-profile/user-education/state/actions';
import { UserEducationService } from 'src/app/user/components/user-profile/user-education/user-education.service';

@Injectable()
export class UserEducationEffects {
  addEducationItem$ = createEffect(() => {
    return this.actions.pipe(
      ofType(userEducationActions.addUserEducationItem),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([{ educationItem }, userId = '']) => {
        const newEducationItem = { ...educationItem, userId };
        return this._educationService.addUserEduction(newEducationItem).pipe(
          map((educationItem: IUserEducationDetails) => {
            this._snackbarService.openSnackBar(
              'User education has been successfully updated',
            );
            return userEducationActions.addedUserEducationItem({
              educationItem,
            });
          }),
          catchError((error) => {
            this._snackbarService.openSnackBar(
              'Something went wrong when updating user education...',
            );
            return of(userProfileActions.error({ error }));
          }),
        );
      }),
    );
  });

  deleteEducationItem$ = createEffect(() => {
    return this.actions.pipe(
      ofType(userEducationActions.removeEducationItem),
      switchMap(({ id }) => {
        return this._educationService.removeUserEduction(id).pipe(
          map(() => {
            this._snackbarService.openSnackBar(
              'User education has been successfully deleted',
            );
            return userEducationActions.removedEducationItem({
              id,
            });
          }),
          catchError((error) => {
            this._snackbarService.openSnackBar(
              'Something went wrong when deleting user education...',
            );
            return of(userProfileActions.error({ error }));
          }),
        );
      }),
    );
  });

  updateEducationItem$ = createEffect(() => {
    return this.actions.pipe(
      ofType(userEducationActions.updateUserEducationItem),
      switchMap(({ id, educationItem }) => {
        return this._educationService
          .updateUserEducationById(id, educationItem)
          .pipe(
            map((updatedEducationItem: IUserEducationDetails) => {
              this._snackbarService.openSnackBar(
                'User education has been successfully updated',
              );
              return userEducationActions.updatedUserEducationItem({
                educationItem: updatedEducationItem,
              });
            }),
            catchError((error) => {
              this._snackbarService.openSnackBar(
                'Something went wrong when updating user education...',
              );
              return of(userProfileActions.error({ error }));
            }),
          );
      }),
    );
  });

  constructor(
    private store: Store,
    private actions: Actions,
    private _educationService: UserEducationService,
    private _snackbarService: SnackbarService,
  ) {}
}
