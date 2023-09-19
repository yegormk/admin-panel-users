import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BaseIconCellComponent } from 'src/app/shared/components/ag-grid/base-icon-cell/base-icon-cell.component';

@Component({
  selector: 'app-edit-user-cell',
  templateUrl: './edit-user-cell.component.html',
  styleUrls: [
    './edit-user-cell.component.scss',
    '../../../../../shared/components/ag-grid/base-icon-cell/base-icon-cell.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserCellComponent extends BaseIconCellComponent {}
