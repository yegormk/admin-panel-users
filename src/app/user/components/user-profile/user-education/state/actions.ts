import { props } from '@ngrx/store';
import { createActionGroup } from '@ngrx/store';

import { IUserEducationDetails } from 'src/app/shared/interfaces/user-education';
import { IUpdateUserEducationItemDTO } from 'src/app/user/components/user-profile/interfaces/update-user-education-item-dto';

export const userEducationActions = createActionGroup({
  source: 'User Education',
  events: {
    'Add User Education Item': props<{
      educationItem: IUpdateUserEducationItemDTO;
    }>(),
    'Added User Education Item': props<{
      educationItem: IUserEducationDetails;
    }>(),
    'Update User Education Item': props<{
      educationItem: IUpdateUserEducationItemDTO;
      id: number;
    }>(),
    'Updated User Education Item': props<{
      educationItem: IUserEducationDetails;
    }>(),
    'Remove Education Item': props<{ id: number }>(),
    'Removed Education Item': props<{ id: number }>(),
  },
});
