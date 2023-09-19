import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

import { IUserDetails } from 'src/app/shared/interfaces/user-details';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IUpdateUserDTO } from 'src/app/user/components/user-profile/interfaces/update-user-dto';
import { UserService } from 'src/app/user/services/user.service';

export interface UserListState {
  users: IUserDetails[] | null;
  loading: boolean;
}

const initialState: UserListState = {
  users: null,
  loading: false,
};

@Injectable()
export class UserListStore extends ComponentStore<UserListState> {
  readonly users$ = this.select((state) => state.users);
  readonly loading$ = this.select(({ loading }) => loading);

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
  ) {
    super(initialState);
  }

  getUserList = this.effect((trigger$) => {
    return trigger$.pipe(
      switchMap(() => {
        this.setLoading(true);
        return this.userService.getAllUsers();
      }),
      tap((users) => {
        this.setLoading(false);
        this.patchState({ users: users.data });
      }),
      catchError((error) => {
        this.setLoading(false);
        this.snackbarService.openSnackBar(
          `Users Loading Failed: ${error.message}`,
        );
        return of(null);
      }),
    );
  });

  updateUser$ = this.effect(
    (args$: Observable<{ userId: string; updatedUser: IUpdateUserDTO }>) =>
      args$.pipe(
        switchMap((updateOptions) => {
          this.setLoading(true);
          return this.userService.updateUserById(
            updateOptions.userId,
            updateOptions.updatedUser,
          );
        }),
        tap((updatedUser) => {
          this.setLoading(false);
          this.patchState((state) => ({
            users: state.users?.map((user) =>
              user.id === updatedUser.id ? updatedUser : user,
            ),
          }));
        }),
        catchError((error) => {
          this.setLoading(false);
          this.snackbarService.openSnackBar(
            `User Update Failed: ${error.message}`,
          );
          return of(null);
        }),
      ),
  );

  private setLoading(state: boolean): void {
    this.patchState({ loading: state });
  }
}
