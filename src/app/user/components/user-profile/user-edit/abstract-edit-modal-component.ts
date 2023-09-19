import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { UnSubscriberComponent } from 'src/app/shared/classes/unsubscriber';
import { updateUserDtoNumericProperties } from 'src/app/user/components/user-profile/constants/update-user-dto-numeric-properties';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class AbstractEditModalComponent<T>
  extends UnSubscriberComponent
  implements OnInit
{
  form!: FormGroup;
  protected fb = inject(FormBuilder);
  _dialogRef = inject(MatDialogRef<T>);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.setFormData();
    this.createForm();
  }

  abstract setFormData(): void;
  abstract createForm(): void;

  onSubmit(): void {
    this.checkForNumberValues();
    this.checkForNullValues();
    this._dialogRef.close(this.form.value);
  }

  protected checkForNumberValues(): void {
    updateUserDtoNumericProperties.forEach((property) => {
      if (this.form.value[property]) {
        this.form.value[property] = Number(this.form.value[property]);
      }
    });
  }
  protected checkForNullValues(): void {
    Object.keys(this.form.value).forEach((key) => {
      if (this.form.value[key] === '') {
        this.form.value[key] = null;
      }
    });
  }
}
