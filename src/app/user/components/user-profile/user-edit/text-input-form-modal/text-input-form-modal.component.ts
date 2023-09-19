import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, takeUntil } from 'rxjs';

import { AbstractEditModalComponent } from 'src/app/user/components/user-profile/user-edit/abstract-edit-modal-component';
import { IValidationOptions } from 'src/app/user/components/user-profile/user-edit/interfaces/validation-options';

export type textInputFormModalData = {
  titles: Map<string, string>;
  formData: object;
  header: string;
  style: 'single-column' | 'double-column';
  validationOptions?: Map<string, IValidationOptions>;
  textareaFields?: string[];
};

@Component({
  selector: 'app-edit-bank-info-modal',
  templateUrl: './text-input-form-modal.component.html',
  styleUrls: ['../user-edit.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputFormModalComponent extends AbstractEditModalComponent<TextInputFormModalComponent> {
  dialogData!: textInputFormModalData;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Observable<textInputFormModalData>,
  ) {
    super();
  }

  setFormData(): void {
    this.data.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.dialogData = data;
    });
  }

  createForm(): void {
    const { titles, validationOptions, formData } = this.dialogData;
    this.form = this.fb.group({});
    const properties = [...titles.keys()];
    properties.forEach((property) => {
      if (validationOptions?.get(property)) {
        this.form.addControl(
          property,
          this.fb.control(
            formData[property as keyof typeof formData],
            Validators.pattern(
              validationOptions?.get(property)?.pattern as string,
            ),
          ),
        );
      }
      this.form.addControl(
        property,
        this.fb.control(formData[property as keyof typeof formData]),
      );
    });
  }
}
