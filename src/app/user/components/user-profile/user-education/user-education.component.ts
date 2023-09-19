import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs';

import { clipboardEducationContactsRegistry } from 'src/app/user/components/user-profile/constants/clipboard-property-names-registries/clipboard-education-contacts-registry';
import { AbstractUserProfileComponent } from 'src/app/user/components/user-profile/abstract-user-profile-component';
import {
  EducationFormModalComponent,
  IUserEducationFormData,
} from 'src/app/user/components/user-profile/user-edit/education-form-modal/education-form-modal.component';
import { selectUserEducation } from 'src/app/user/components/user-profile/user-education/state/selectors';
import { userEducationActions } from 'src/app/user/components/user-profile/user-education/state/actions';

@Component({
  selector: 'app-user-education-contacts',
  templateUrl: './user-education.component.html',
  styleUrls: ['../user-profile.component.scss', './user-education.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEducationComponent extends AbstractUserProfileComponent {
  clipboardRegistry = clipboardEducationContactsRegistry;
  userEducation$ = this.store.select(selectUserEducation);

  onEditEducation(id: number | null = null): void {
    const educationDataToEdit = this.userEducation$.pipe(
      map((educationInfo) => {
        const formData = id
          ? educationInfo.find((educationItem) => educationItem.id === id)
          : null;
        return { formData } as IUserEducationFormData;
      }),
    );
    this.setModal<EducationFormModalComponent, IUserEducationFormData>(
      EducationFormModalComponent,
      educationDataToEdit,
    )
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        filter((editedData) => editedData),
      )
      .subscribe((editedData) => {
        if (id) {
          this.store.dispatch(
            userEducationActions.updateUserEducationItem({
              id,
              educationItem: editedData,
            }),
          );
        } else {
          this.store.dispatch(
            userEducationActions.addUserEducationItem({
              educationItem: editedData,
            }),
          );
        }
      });
  }

  onDeleteEducation(id: number): void {
    this.store.dispatch(userEducationActions.removeEducationItem({ id }));
  }
}
