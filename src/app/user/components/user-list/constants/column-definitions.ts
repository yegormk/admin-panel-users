import { ColDef, ICellRendererParams } from 'ag-grid-community';

import { CopyCellComponent } from 'src/app/shared/components/ag-grid/copy-cell/copy-cell.component';
import { StatusCellComponent } from 'src/app/shared/components/ag-grid/status-cell/status-cell.component';
import { EditUserCellComponent } from 'src/app/user/components/user-list/cell-components/edit-user-cell/edit-user-cell.component';
import { ProjectsCellComponent } from 'src/app/user/components/user-list/cell-components/projects-cell/projects-cell.component';

export const UserListColDefs: ColDef[] = [
  {
    headerName: 'Full Name',
    valueGetter: (params): string => {
      return params.data.name || params.data.surname
        ? `${params.data.name} ${params.data.surname}`
        : 'N/A';
    },
    flex: 3,
  },
  {
    headerName: 'Email',
    cellRenderer: CopyCellComponent,
    cellRendererParams: {
      value: (params: ICellRendererParams) => params.data.email,
    },
    getQuickFilterText: (params): string => params.data.email,
    flex: 4,
  },
  {
    headerName: 'Status',
    flex: 3,
    cellRenderer: StatusCellComponent,
    cellRendererParams: {
      value: (params: ICellRendererParams) => params.data.status,
      statusesData: {
        archived: {
          icon: 'person',
          name: 'Disabled',
          color: 'rgba(138, 137, 137, 0.748)',
        },
        unarchived: {
          icon: 'how_to_reg',
          name: 'Active',
          color: 'rgb(8, 205, 90)',
        },
      },
    },
  },
  {
    headerName: 'CV',
    cellRenderer: (params: ICellRendererParams): string => {
      if (params.data.cv) {
        const { fileUrl, originalName } = params.data.cv;
        const formattedFileName = originalName.replace(
          /\s*(\(\w*\s*\))*(\.\w+)*/g,
          '',
        );
        const downloadUrl = fileUrl.replace(
          'upload/',
          `upload/fl_attachment:${formattedFileName}/`,
        );
        return `<a  href="${downloadUrl}" style="color:black">${originalName}</a>`;
      }
      return 'N/A';
    },
    getQuickFilterText: (params): string => params.data.cv?.originalName,
    flex: 2,
  },
  { headerName: 'Projects', cellRenderer: ProjectsCellComponent, flex: 3 },
  {
    headerName: 'Edit User',
    cellRenderer: EditUserCellComponent,
    flex: 2,
  },
];
