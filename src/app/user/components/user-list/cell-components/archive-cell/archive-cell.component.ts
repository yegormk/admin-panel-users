import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

import { BaseIconCellComponent } from 'src/app/shared/components/ag-grid/base-icon-cell/base-icon-cell.component';

@Component({
  selector: 'app-archive-cell',
  templateUrl: './archive-cell.component.html',
  styleUrls: [
    './archive-cell.component.scss',
    '../../../../../shared/components/ag-grid/base-icon-cell/base-icon-cell.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveCellComponent extends BaseIconCellComponent {
  params!: ICellRendererParams;

  override agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onToggleStatus(userId: string, status: string): void {
    this.params.context.componentParent.toggleUserStatus({
      userId: userId,
      updatedUser: {
        status: status === 'archived' ? 'unarchived' : 'archived',
      },
    });
  }
}
