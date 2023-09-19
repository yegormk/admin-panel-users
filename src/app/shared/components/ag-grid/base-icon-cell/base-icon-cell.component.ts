import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { IUserDetails } from 'src/app/shared/interfaces/user-details';

@Component({
  template:'',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseIconCellComponent
  implements ICellRendererAngularComp
{
  data!: IUserDetails;

  agInit(params: ICellRendererParams): void {
    this.data = params.data;
  }

  refresh(): boolean {
    return false;
  }
}
