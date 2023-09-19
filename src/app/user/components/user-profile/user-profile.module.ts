import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from 'src/app/user/components/user-profile/user-profile.component';
import { EmptyMessageComponent } from 'src/app/user/components/user-profile/empty-message/empty-message.component';
import { UserPersonalInfoComponent } from 'src/app/user/components/user-profile/user-personal-info/user-personal-info.component';
import { UserSkillsComponent } from 'src/app/user/components/user-profile/user-skills/user-skills.component';
import { UserWorkInfoComponent } from 'src/app/user/components/user-profile/user-work-info/user-work-info.component';
import { TextInputFormModalComponent } from 'src/app/user/components/user-profile/user-edit/text-input-form-modal/text-input-form-modal.component';
import { PersonalInfoFormModalComponent } from 'src/app/user/components/user-profile/user-edit/personal-info-form-modal/personal-info-form-modal.component';
import { UserContactsBankSocialsInfoComponent } from 'src/app/user/components/user-profile/user-contacts-bank-socials-info/user-contacts-bank-socials-info.component';
import { UserEducationComponent } from 'src/app/user/components/user-profile/user-education/user-education.component';
import { UserTermsComponent } from 'src/app/user/components/user-profile/user-personal-info/user-terms/user-terms.component';
import { EducationFormModalComponent } from 'src/app/user/components/user-profile/user-edit/education-form-modal/education-form-modal.component';

const routes = [
  {
    path: '',
    component: UserProfileComponent,
  },
];
@NgModule({
  declarations: [
    UserProfileComponent,
    UserPersonalInfoComponent,
    UserEducationComponent,
    UserWorkInfoComponent,
    EmptyMessageComponent,
    UserSkillsComponent,
    UserContactsBankSocialsInfoComponent,
    TextInputFormModalComponent,
    PersonalInfoFormModalComponent,
    EducationFormModalComponent,
    UserTermsComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatChipsModule,
    SharedModule,
    HttpClientModule,
    ClipboardModule,
    [RouterModule.forChild(routes)],
  ],
})
export class UserProfileModule {}
