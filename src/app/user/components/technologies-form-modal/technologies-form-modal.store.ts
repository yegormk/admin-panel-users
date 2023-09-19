import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

import { ITechnology } from 'src/app/shared/interfaces/technology';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { INewTechnology } from 'src/app/user/components/technologies-form-modal/interfaces/new-technology';
import { TechnologiesService } from 'src/app/user/components/technologies-form-modal/technologies.service';

interface ITechnologiesState {
  allTechnologies: ITechnology[];
  userTechnologies: Array<ITechnology | INewTechnology>;
}
const defaultState = {
  allTechnologies: [],
  userTechnologies: [],
};

@Injectable()
export class TechnologiesFormStore
  extends ComponentStore<ITechnologiesState>
  implements OnStoreInit
{
  constructor(
    private readonly _technologiesService: TechnologiesService,
    private _snackBarService: SnackbarService,
  ) {
    super(defaultState);
  }

  ngrxOnStoreInit(): void {
    this.getAllTechnologies$();
  }

  readonly allTechnologies$ = this.select(
    ({ allTechnologies }) => allTechnologies,
  );
  readonly userTechnologies$ = this.select(
    ({ userTechnologies }) => userTechnologies,
  );

  readonly getAllTechnologies$ = this.effect((source$) => {
    return source$.pipe(
      switchMap(() => {
        return this._technologiesService.getAllTechnologies().pipe(
          tap({
            next: (technologies: ITechnology[]) => {
              this.setAllTechnologies(technologies);
            },
            error: (error) => {
              this._snackBarService.openSnackBar(
                'Something went wrong when loading all technologies..',
              );
              console.log(error);
            },
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  public addToUserTechnologies(technology: ITechnology | INewTechnology): void {
    this.patchState((state) => {
      if (
        state.userTechnologies.findIndex(
          (stateTechnology) => stateTechnology.title === technology.title,
        ) < 0
      ) {
        return {
          userTechnologies: [...state.userTechnologies, technology],
        };
      }
      return state;
    });
  }

  public removeFromUserTechnologies(
    technology: ITechnology | INewTechnology,
  ): void {
    this.patchState((state) => {
      const filteredTechnologies = state.userTechnologies.filter(
        (userTechnology) => userTechnology.title !== technology.title,
      );
      return {
        userTechnologies: filteredTechnologies,
      };
    });
  }

  private setAllTechnologies(technologies: ITechnology[]): void {
    this.patchState({ allTechnologies: technologies });
  }

  public setUserTechnologies(technologies: ITechnology[]): void {
    this.patchState({ userTechnologies: technologies });
  }
}
