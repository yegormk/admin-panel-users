import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITechnology } from 'src/app/shared/interfaces/technology';
import { IUserBankInvoiceData } from 'src/app/shared/interfaces/user-bank-invoice-data';
import { IUserEducationDetails } from 'src/app/shared/interfaces/user-education';
import { IUserPersonalData } from 'src/app/shared/interfaces/user-personal-info-data';
import { IUserSocialLinksData } from 'src/app/shared/interfaces/user-social-links-data';
import { IUserProfileState } from 'src/app/user/components/user-profile/state/reducer';

export interface IUserProfileFeatureState {
  user: IUserProfileState;
  'user-education': IUserEducationDetails[];
}

export const selectUserProfileFeature =
  createFeatureSelector<IUserProfileFeatureState>('user-profile');

export const selectUserSlice = createSelector(
  selectUserProfileFeature,
  (state: IUserProfileFeatureState) => state.user,
);

export const selectUser = createSelector(
  selectUserSlice,
  (state: IUserProfileState) => state.user,
);

export const selectLoading = createSelector(
  selectUserSlice,
  (state: IUserProfileState) => state.loading,
);

export const selectUserId = createSelector(
  selectUserSlice,
  (state: IUserProfileState) => String(state.user?.id),
);

export const selectUserWorkInfo = createSelector(
  selectUserSlice,
  (state: IUserProfileState) => state.user?.workHistory,
);

export const selectUserSkills = createSelector(
  selectUserSlice,
  (state: IUserProfileState) => ({
    techStack: state.user?.techStack as ITechnology[],
  }),
);

export const selectUserContacts = createSelector(
  selectUserSlice,
  (state: IUserProfileState) => ({
    city: state.user?.city,
    address: state.user?.address,
  }),
);

export const selectUserBankInfo = createSelector(
  selectUserSlice,
  ({ user }) =>
    ({
      individualEntrepreneurName: user?.individualEntrepreneurName,
      individualEntrepreneurAddress: user?.individualEntrepreneurAddress,
      individualEntrepreneurIndividualTaxNumber:
        user?.individualEntrepreneurIndividualTaxNumber,
      individualEntrepreneurBankAccounNumber:
        user?.individualEntrepreneurBankAccounNumber,
      individualEntrepreneurBankName: user?.individualEntrepreneurBankName,
      individualEntrepreneurBankCode: user?.individualEntrepreneurBankCode,
      individualEntrepreneurBeneficiaryBank:
        user?.individualEntrepreneurBeneficiaryBank,
      individualEntrepreneurSwiftCode: user?.individualEntrepreneurSwiftCode,
    } as IUserBankInvoiceData),
);

export const selectUserSocialsInfo = createSelector(
  selectUserSlice,
  ({ user }) =>
    ({
      upwork: user?.upwork,
      github: user?.github,
      linkedin: user?.linkedin,
      telegramTag: user?.telegramTag,
    } as IUserSocialLinksData),
);

export const selectUserPersonalInfo = createSelector(
  selectUserSlice,
  ({ user }) =>
    ({
      name: user?.name,
      surname: user?.surname,
      status: user?.status,
      birthday: user?.birthday,
      email: user?.email,
      startDate: user?.startDate,
      endDate: user?.endDate,
      endReason: user?.endReason,
      phone: user?.phone,
      avatarUrl: user?.avatarUrl,
      isOnProject: Boolean(user?.workHistory.length),
    } as IUserPersonalData),
);
