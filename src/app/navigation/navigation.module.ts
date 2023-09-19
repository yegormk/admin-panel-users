import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { SiteLayoutComponent } from 'src/app/navigation/components/site-layout/site-layout.component';

@NgModule({
  declarations: [SiteLayoutComponent],
  imports: [SharedModule, RouterModule],
})
export class NavigationModule {}
