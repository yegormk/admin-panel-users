import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs';

import { AbstractUserProfileComponent } from 'src/app/user/components/user-profile/abstract-user-profile-component';
import { userProfileActions } from 'src/app/user/components/user-profile/state/actions';
import { selectUserSkills } from 'src/app/user/components/user-profile/state/selectors';
import { TechnologiesFormModalComponent } from 'src/app/user/components/technologies-form-modal/technologies-form-modal.component';
import { ITechnologiesModalDialogData } from 'src/app/user/components/technologies-form-modal/interfaces/technologies-modal-dialog-data';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss', '../user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSkillsComponent extends AbstractUserProfileComponent {
  userSkills$ = this.store.select(selectUserSkills);

  onEditSkills(): void {
    this.setModal<TechnologiesFormModalComponent, ITechnologiesModalDialogData>(
      TechnologiesFormModalComponent,
      this.userSkills$.pipe(
        map((skills) => ({ technologies: skills.techStack })),
      ),
    )
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data),
      )
      .subscribe((technologies) => {
        this.store.dispatch(
          userProfileActions.updateUserTechnologies({ technologies }),
        );
      });
  }
}
