import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { filter, takeUntil } from 'rxjs';

import { clipboardPersonalInfoRegistry } from 'src/app/user/components/user-profile/constants/clipboard-property-names-registries/clipboard-personal-info-registry';
import { selectUserPersonalInfo } from 'src/app/user/components/user-profile/state/selectors';
import { AbstractUserProfileComponent } from 'src/app/user/components/user-profile/abstract-user-profile-component';
import { userProfileActions } from 'src/app/user/components/user-profile/state/actions';
import { PersonalInfoFormModalComponent } from 'src/app/user/components/user-profile/user-edit/personal-info-form-modal/personal-info-form-modal.component';
import { IUserPersonalData } from 'src/app/shared/interfaces/user-personal-info-data';
import { UserStatus } from 'src/app/shared/constants/user-status';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.scss', '../user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPersonalInfoComponent extends AbstractUserProfileComponent {
  @ViewChild('toggle') toggle!: MatSlideToggle;

  userData$ = this.store.select(selectUserPersonalInfo);
  userStatus = UserStatus;
  clipboardRegistry = clipboardPersonalInfoRegistry;

  onEditPersonal(): void {
    this.setModal<PersonalInfoFormModalComponent, IUserPersonalData>(
      PersonalInfoFormModalComponent,
      this.userData$,
    )
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data),
      )
      .subscribe((data) => {
        this.store.dispatch(
          userProfileActions.updateUser({
            user: { endReason: null, ...data },
          }),
        );
      });
  }

  onToggleStatus(status: UserStatus): void {
    const newStatus = this.checkUserActive(status)
      ? UserStatus.archived
      : UserStatus.unarchived;
    this.toggle.checked = this.checkUserActive(newStatus);
    this.store.dispatch(
      userProfileActions.updateUser({ user: { status: newStatus } }),
    );
  }

  checkUserActive(status: UserStatus): boolean {
    return status === UserStatus.unarchived;
  }
}
