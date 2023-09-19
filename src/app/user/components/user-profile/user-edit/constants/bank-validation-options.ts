import { IValidationOptions } from 'src/app/user/components/user-profile/user-edit/interfaces/validation-options';

export const userBankInfoValidationOptions = new Map<
  string,
  IValidationOptions
>([
  [
    'individualEntrepreneurIndividualTaxNumber',
    {
      pattern: '^[0-9]{10}$',
      errorMessage: 'A valid tax number has 10 digits',
    },
  ],
  [
    'individualEntrepreneurBankCode',
    {
      pattern: '^[0-9]{6}$',
      errorMessage: 'A valid bank code has 6 digits',
    },
  ],
  [
    'individualEntrepreneurBankAccounNumber',
    {
      pattern: 'UA\\d{8}[A-Z0-9]{19}',
      errorMessage: 'Example: UAXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    },
  ],
  [
    'individualEntrepreneurSwiftCode',
    {
      pattern: '^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$',
      errorMessage: 'Example: PBANUA2XHAF',
    },
  ],
]);
