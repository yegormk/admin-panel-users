import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-copy-cell',
  templateUrl: './copy-cell.component.html',
  styleUrls: ['./copy-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyCellComponent implements ICellRendererAngularComp {
  valueToCopy!: string;

  agInit(params: ICellRendererParams): void {
    this.valueToCopy = params.value(params);
  }

  refresh(): boolean {
    return false;
  }
}
