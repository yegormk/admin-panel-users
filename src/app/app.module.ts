import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from 'src/app/auth/state/effects';

import { HomeComponent } from 'src/app/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { TokenInterceptor } from 'src/app/shared/interceptors/token.interceptor';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { UserEffects } from 'src/app/user/state/effects';
import { appState } from 'src/app/app.state';
import { NavigationModule } from 'src/app/navigation/navigation.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    NavigationModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appState),
    EffectsModule.forRoot([UserEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
