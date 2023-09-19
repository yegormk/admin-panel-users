import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, filter, map, Observable, takeUntil } from 'rxjs';

import {
  textInputFormModalData,
  TextInputFormModalComponent,
} from 'src/app/user/components/user-profile/user-edit/text-input-form-modal/text-input-form-modal.component';
import { UserSocialLinksTitles } from 'src/app/user/components/user-profile/constants/social-links';
import { userBankInfoTitles } from 'src/app/user/components/user-profile/constants/user-bank-info-titles';
import { clipboardBankSocialsRegistry } from 'src/app/user/components/user-profile/constants/clipboard-property-names-registries/clipboard-bank-socials-registy';
import {
  selectUserBankInfo,
  selectUserContacts,
  selectUserSocialsInfo,
} from 'src/app/user/components/user-profile/state/selectors';
import { userProfileActions } from 'src/app/user/components/user-profile/state/actions';
import { AbstractUserProfileComponent } from 'src/app/user/components/user-profile/abstract-user-profile-component';
import { userBankInfoValidationOptions } from 'src/app/user/components/user-profile/user-edit/constants/bank-validation-options';
import { userSocialsValidationOptions } from 'src/app/user/components/user-profile/user-edit/constants/socials-validation-options';
import { UserContactsInfoTitles } from 'src/app/user/components/user-profile/constants/user-contacts-info-titles';

@Component({
  selector: 'app-user-bank-and-socials-info',
  templateUrl: './user-contacts-bank-socials-info.component.html',
  styleUrls: [
    './user-contacts-bank-socials-info.component.scss',
    '../user-profile.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserContactsBankSocialsInfoComponent extends AbstractUserProfileComponent {
  userBankData$ = this.store.select(selectUserBankInfo);
  userSocialsData$ = this.store.select(selectUserSocialsInfo);
  userContacts$ = this.store.select(selectUserContacts);

  userBankInfoTitles = userBankInfoTitles;
  UserSocialLinksTitles = UserSocialLinksTitles;
  bankSocialsClipboardRegistry = clipboardBankSocialsRegistry;

  isEmpty$ = combineLatest([
    this.userBankData$,
    this.userSocialsData$,
    this.userContacts$,
  ]).pipe(
    map(([bank, socials, contacts]) => {
      const checkEmpty = <T extends object>(data: T): boolean =>
        Object.values(data).every((value) => !value);
      return {
        bank: checkEmpty(bank),
        socials: checkEmpty(socials),
        contacts: checkEmpty(contacts),
      };
    }),
  );

  onEditContacts(): void {
    const dialogData = this.userContacts$.pipe(
      map((user) => ({
        titles: UserContactsInfoTitles,
        formData: user,
        header: 'Edit Address',
        style: 'single-column',
      })),
    );
    this.processEditModal(dialogData as Observable<textInputFormModalData>);
  }

  onEditBank(): void {
    const dialogData = this.userBankData$.pipe(
      map((userBankData) => ({
        titles: userBankInfoTitles,
        formData: userBankData,
        header: 'Edit Bank Invoice Info',
        style: 'double-column',
        validationOptions: userBankInfoValidationOptions,
      })),
    );
    this.processEditModal(dialogData as Observable<textInputFormModalData>);
  }

  onEditSocials(): void {
    const dialogData = this.userSocialsData$.pipe(
      map((userSocialsData) => ({
        titles: UserSocialLinksTitles,
        formData: userSocialsData,
        header: 'Edit Social Links',
        style: 'single-column',
        validationOptions: userSocialsValidationOptions,
      })),
    );
    this.processEditModal(dialogData as Observable<textInputFormModalData>);
  }

  private processEditModal(data: Observable<textInputFormModalData>): void {
    this.setModal<TextInputFormModalComponent, textInputFormModalData>(
      TextInputFormModalComponent,
      data as Observable<textInputFormModalData>,
    )
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data),
      )
      .subscribe((data) => {
        this.store.dispatch(userProfileActions.updateUser({ user: data }));
      });
  }
}
