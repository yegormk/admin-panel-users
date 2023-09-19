import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { IStatusCellParams } from 'src/app/shared/interfaces/status-cell-params';
import { IStatusesData } from 'src/app/shared/interfaces/status-data';

@Component({
  selector: 'app-status-cell',
  templateUrl: './status-cell.component.html',
  styleUrls: ['./status-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCellComponent implements ICellRendererAngularComp {
  status!: keyof IStatusesData;
  statusesData!: IStatusesData;

  agInit(params: ICellRendererParams & IStatusCellParams): void {
    this.status = params.value(params);
    this.statusesData = params.statusesData;
  }

  refresh(): boolean {
    return false;
  }
}
