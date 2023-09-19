import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectUserPersonalInfo } from 'src/app/user/components/user-profile/state/selectors';

@Component({
  selector: 'app-user-terms',
  templateUrl: './user-terms.component.html',
  styleUrls: ['./user-terms.component.scss', '../user-personal-info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTermsComponent {
  userData$ = this.store.select(selectUserPersonalInfo);

  constructor(private store: Store) {}
}
