import { props } from '@ngrx/store';
import { createActionGroup } from '@ngrx/store';

import { ITechnology } from 'src/app/shared/interfaces/technology';
import { IUserDetails } from 'src/app/shared/interfaces/user-details';
import { INewTechnology } from 'src/app/user/components/technologies-form-modal/interfaces/new-technology';
import { IUpdateUserDTO } from 'src/app/user/components/user-profile/interfaces/update-user-dto';

export const userProfileActions = createActionGroup({
  source: 'User',
  events: {
    'Load User': props<{ id: string }>(),
    'Loaded User': props<{ user: IUserDetails }>(),
    Error: props<{ error: string }>(),
    'Update User': props<{ user: IUpdateUserDTO }>(),
    'Updated User': props<{ user: IUserDetails }>(),
    'Update User Technologies': props<{
      technologies: Array<ITechnology | INewTechnology>;
    }>(),
    'Updated User Technologies': props<{
      updatedTechnologies: ITechnology[];
    }>(),
  },
});
