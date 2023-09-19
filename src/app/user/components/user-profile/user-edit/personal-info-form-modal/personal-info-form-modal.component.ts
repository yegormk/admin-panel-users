import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, distinctUntilChanged, startWith, takeUntil } from 'rxjs';

import { IUserPersonalData } from 'src/app/shared/interfaces/user-personal-info-data';
import { AbstractEditModalComponent } from 'src/app/user/components/user-profile/user-edit/abstract-edit-modal-component';

@Component({
  selector: 'app-personal-info-form-modal',
  templateUrl: './personal-info-form-modal.component.html',
  styleUrls: ['../user-edit.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoFormModalComponent extends AbstractEditModalComponent<PersonalInfoFormModalComponent> {
  dialogData!: IUserPersonalData;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Observable<IUserPersonalData>,
  ) {
    super();
  }

  endDateFilter = (date: Date | null): boolean => {
    if (this.startDate) {
      return Boolean(date && new Date(date) >= new Date(this.startDate));
    }
    return false;
  };

  startDateFilter = (date: Date | null): boolean => {
    if (this.endDate) {
      return Boolean(date && new Date(date) <= new Date(this.endDate));
    }
    return true;
  };

  setFormData(): void {
    this.data.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.dialogData = data;
    });
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [this.dialogData.name],
      surname: [this.dialogData.surname],
      birthday: [this.dialogData.birthday],
      email: [this.dialogData.email, Validators.email],
      startDate: [this.dialogData.startDate, Validators['required']],
      endDate: [this.dialogData.endDate],
      phone: [this.dialogData.phone, Validators.pattern('^[+]380[0-9]{9}$')],
    });

    this.form
      .get('endDate')
      ?.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        startWith(this.dialogData.endReason),
      )
      .subscribe((value) => {
        if (value) {
          this.form.addControl(
            'endReason',
            this.fb.control(this.dialogData.endReason, Validators.required),
          );
        } else {
          this.form.removeControl('endReason');
        }
      });
  }

  get startDate(): Date {
    return this.form.controls['startDate'].value;
  }

  get endDate(): Date {
    return this.form.controls['endDate'].value;
  }
}
