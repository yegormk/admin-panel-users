import { formatDate } from '@angular/common';

import { datePropertiesInClipboard } from 'src/app/shared/constants/date-properties-in-clipboard';

export const processValue = <T>(value: T, key: string): string => {
  if (typeof value === 'boolean') {
    return formatBooleanValue(value);
  }
  if (datePropertiesInClipboard.includes(key)) {
    return formatDateValue(value as string);
  }
  return String(value);
};

function formatBooleanValue(value: boolean): string {
  return value ? 'yes' : 'no';
}

function formatDateValue(value: string): string {
  return formatDate(new Date(value), 'yyyy-MM-dd', 'en-US');
}
