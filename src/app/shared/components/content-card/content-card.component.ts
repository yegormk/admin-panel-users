import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentCardComponent {}
