import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';

import { propertiesHiddenInClipboardText } from 'src/app/shared/constants/properties-hidden-in-clipboard-text';
import { modifyStringToBold } from 'src/app/shared/services/clipboard/helpers/modify-string-to-bold';
import { processValue } from 'src/app/shared/services/clipboard/helpers/process-value';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor(
    private _snackBarService: SnackbarService,
    private _clipboard: Clipboard,
  ) {}

  copyToClipboard<T extends object>(
    data: T,
    registry: Map<string, string> | null = null,
  ): void {
    this._clipboard.copy(this.formatContent(data, registry));
    this._snackBarService.openSnackBar('Copied to clipboard!');
  }

  private formatContent<T extends object>(
    dataToCopy: T,
    registry: Map<string, string> | null = null,
  ): string {
    function formatDataHelper(dataToCopy: T): string {
      const keys = Object.keys(dataToCopy);
      return keys.reduce((acc, dataToCopyKey) => {
        const dataToCopyItem = dataToCopy[dataToCopyKey as keyof T];

        if (
          propertiesHiddenInClipboardText.includes(dataToCopyKey) ||
          (!dataToCopyItem && dataToCopyItem !== false)
        ) {
          return acc.concat('');
        }

        if (dataToCopyItem instanceof Array) {
          return acc.concat(
            dataToCopyItem?.map((key: T) => formatDataHelper(key)).join('\n') ||
              'no data',
          );
        }
        const key = registry
          ? (registry.get(dataToCopyKey) as string)
          : dataToCopyKey;
        const formattedKey = modifyStringToBold(key);
        const formattedValue = processValue(dataToCopyItem, dataToCopyKey);

        return acc.concat(`${formattedKey}:  ${formattedValue} \n`);
      }, '');
    }

    return formatDataHelper(dataToCopy);
  }
}
