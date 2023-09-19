import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthReducer } from 'src/app/auth/state/reducer';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RegisterComponent } from 'src/app/auth/components/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatCheckboxModule,
    StoreModule.forFeature('auth', AuthReducer),
    MatProgressSpinnerModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
