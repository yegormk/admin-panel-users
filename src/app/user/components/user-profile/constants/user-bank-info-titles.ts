import { IUserBankInvoiceData } from 'src/app/shared/interfaces/user-bank-invoice-data';

export const userBankInfoTitles = new Map<keyof IUserBankInvoiceData, string>([
  ['individualEntrepreneurName', 'User Name'],
  ['individualEntrepreneurAddress', 'Address'],
  ['individualEntrepreneurIndividualTaxNumber', 'Individual Tax Number'],
  ['individualEntrepreneurBankAccounNumber', 'IBAN'],
  ['individualEntrepreneurBankName', 'Bank name'],
  ['individualEntrepreneurBankCode', 'Bank Code'],
  ['individualEntrepreneurBeneficiaryBank', 'Beneficiary Bank'],
  ['individualEntrepreneurSwiftCode', 'SWIFT Code'],
]);
