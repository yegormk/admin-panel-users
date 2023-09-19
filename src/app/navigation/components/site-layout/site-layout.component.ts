import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { logout } from 'src/app/auth/state/actions';
import { wavingHandEmoji } from 'src/app/navigation/constants/waving-hand-emoji';
import { mainUserActions } from 'src/app/user/state/actions';
import {
  selectCurrentUserAvatar,
  selectCurrentUserName,
  selectSiteNavigationLinksDataByUserRole,
} from 'src/app/user/state/selectors';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteLayoutComponent implements OnInit {
  siteNavigationLinksData$ = this.store.select(
    selectSiteNavigationLinksDataByUserRole,
  );
  currentUserName$ = this.store.select(selectCurrentUserName);
  currentUserAvatar$ = this.store.select(selectCurrentUserAvatar);
  wavingHand = wavingHandEmoji;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(mainUserActions.loadCurrentUser());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
