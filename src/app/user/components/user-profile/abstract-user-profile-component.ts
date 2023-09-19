import { MediaMatcher } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UnSubscriberComponent } from 'src/app/shared/classes/unsubscriber';
import {
  mobileModalWidth,
  mobileScreenWidth,
} from 'src/app/shared/constants/media-width';
import { ClipboardService } from 'src/app/shared/services/clipboard/clipboard.service';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-profile.component.scss'],
})
export abstract class AbstractUserProfileComponent extends UnSubscriberComponent {
  protected store = inject(Store);
  protected mediaMatcher = inject(MediaMatcher);
  protected dialog = inject(MatDialog);
  clipboardService = inject(ClipboardService);

  constructor() {
    super();
  }

  protected setModal<T, U extends object>(
    component: ComponentType<T>,
    data: U | Observable<U>,
  ): MatDialogRef<T> {
    return this.dialog.open(component, {
      restoreFocus: false,
      autoFocus: false,
      width: this.mediaMatcher.matchMedia(mobileScreenWidth).matches
        ? mobileModalWidth
        : '',
      maxWidth: this.mediaMatcher.matchMedia(mobileScreenWidth).matches
        ? mobileModalWidth
        : '',
      data,
    });
  }
}
