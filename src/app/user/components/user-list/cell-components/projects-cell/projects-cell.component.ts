import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { IProjectDetailsData } from 'src/app/shared/interfaces/project-details';

@Component({
  selector: 'app-projects-cell',
  templateUrl: './projects-cell.component.html',
  styleUrls: ['./projects-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsCellComponent implements ICellRendererAngularComp {
  projects!:IProjectDetailsData[];

  agInit(params: ICellRendererParams): void {
    this.projects = [...params.data.leadingInProjects, ...params.data.participatingInProjects]
  }

  refresh(): boolean {
    return false;
  }
}
