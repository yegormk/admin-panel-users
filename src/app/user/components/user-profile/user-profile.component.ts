import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs';

import { AbstractUserProfileComponent } from 'src/app/user/components/user-profile/abstract-user-profile-component';
import { clipboardPersonalInfoRegistry } from 'src/app/user/components/user-profile/constants/clipboard-property-names-registries/clipboard-personal-info-registry';
import { userProfileActions } from 'src/app/user/components/user-profile/state/actions';
import {
  selectLoading,
  selectUser,
} from 'src/app/user/components/user-profile/state/selectors';
import {
  textInputFormModalData,
  TextInputFormModalComponent,
} from 'src/app/user/components/user-profile/user-edit/text-input-form-modal/text-input-form-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent
  extends AbstractUserProfileComponent
  implements OnInit
{
  user$ = this.store.select(selectUser);
  loading$ = this.store.select(selectLoading);

  clipboardRegistry = clipboardPersonalInfoRegistry;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.store.dispatch(userProfileActions.loadUser({ id }));
    }
  }

  onEdit(): void {
    this.setModal<TextInputFormModalComponent, textInputFormModalData>(
      TextInputFormModalComponent,
      this.user$.pipe(
        map((user) => ({
          titles: new Map([['positionDescription', 'Position Description']]),
          formData: { positionDescription: user?.positionDescription },
          header: 'Edit Position Description',
          style: 'single-column',
          textareaFields: ['positionDescription'],
        })),
      ),
    )
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data),
      )
      .subscribe((data) => {
        if (data) {
          this.store.dispatch(userProfileActions.updateUser({ user: data }));
        }
      });
  }
}
