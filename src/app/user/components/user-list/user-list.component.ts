import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { takeUntil } from 'rxjs';
import { UnSubscriberComponent } from 'src/app/shared/classes/unsubscriber';

import { UserListColDefs } from 'src/app/user/components/user-list/constants/column-definitions';
import { UserListStore } from 'src/app/user/components/user-list/user-list.component.store';
import { IUpdateUserDTO } from 'src/app/user/components/user-profile/interfaces/update-user-dto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserListStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent extends UnSubscriberComponent implements OnInit {
  users$ = this.userListStore.users$;
  loading$ = this.userListStore.loading$;
  gridApi!: GridApi;
  filter = new FormControl();
  context = { componentParent: this };
  colDefs = UserListColDefs;

  constructor(private userListStore: UserListStore) {
    userListStore.getUserList();
    super();
  }

  ngOnInit(): void {
    this.filter.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.gridApi.setQuickFilter(value);
      });
  }

  toggleUserStatus({ userId, updatedUser }: {
    userId: string;
    updatedUser: IUpdateUserDTO;
  }): void {
    this.userListStore.updateUser$({ userId, updatedUser });
  }

  onGridReady(params: { api: GridApi }): void {
    this.gridApi = params.api;
  }
}
