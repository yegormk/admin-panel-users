import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-edit-modal-wrapper',
  templateUrl: './edit-modal-wrapper.component.html',
  styleUrls: ['./edit-modal-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditModalWrapperComponent {
  @Input() isFormValid!: boolean;
  @Input() title!: string;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.save.emit();
  }
}
