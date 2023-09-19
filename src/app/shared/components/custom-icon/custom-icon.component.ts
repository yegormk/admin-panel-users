import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { defaultIconSize } from 'src/app/shared/constants/custom-application-icons';

@Component({
  selector: 'app-custom-icon',
  templateUrl: './custom-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconComponent {
  @Input() width = defaultIconSize;
  @Input() height = defaultIconSize;
  @Input() name!: string;
}
