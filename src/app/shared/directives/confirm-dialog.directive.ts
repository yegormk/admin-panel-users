import {
  Directive,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Subject, Subscription } from 'rxjs';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { confirmDialogDefaultConfig } from 'src/app/shared/constants/confirm-dialog-default-config';
import { IConfirmDialogConfig } from 'src/app/shared/interfaces/i-confirm-dialog-config';

@Directive({
  selector: '[appConfirmDialog]',
})
export class ConfirmDialogDirective implements OnDestroy {
  @Input() modalConfig: IConfirmDialogConfig = {};
  @Output() confirm = new Subject<void>();
  defaultConfig = confirmDialogDefaultConfig;
  private confirmedSubscription!: Subscription;

  constructor(private dialog: MatDialog) {}

  @HostListener('click')
  click(): void {
    this.confirmedSubscription = this.dialog
      .open(ConfirmModalComponent, {
        data: { ...this.defaultConfig, ...this.modalConfig },
      })
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe(() => {
        this.confirm.next();
      });
  }

  ngOnDestroy(): void {
    if (this.confirmedSubscription) {
      this.confirmedSubscription.unsubscribe();
    }
  }
}
