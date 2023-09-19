import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ClipboardService } from 'src/app/shared/services/clipboard/clipboard.service';
import { selectUserWorkInfo } from 'src/app/user/components/user-profile/state/selectors';

@Component({
  selector: 'app-user-work-info',
  templateUrl: './user-work-info.component.html',
  styleUrls: [
    './user-work-info.component.scss',
    '../user-profile.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserWorkInfoComponent {
  userData$ = this.store.select(selectUserWorkInfo);

  constructor(
    private store: Store,
    public clipboardService: ClipboardService,
  ) {}
}
