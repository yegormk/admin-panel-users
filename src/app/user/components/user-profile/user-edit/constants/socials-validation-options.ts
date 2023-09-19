import { IValidationOptions } from 'src/app/user/components/user-profile/user-edit/interfaces/validation-options';

export const userSocialsValidationOptions = new Map<string, IValidationOptions>(
  [
    [
      'github',
      {
        pattern: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
        errorMessage: 'Invalid GitHub URL',
      },
    ],
    [
      'telegramTag',
      {
        pattern: '(https?://)?(www[.])?(telegram|t).me/([a-zA-Z0-9_-]*)/?$',
        errorMessage: 'Invalid Telegram Tag',
      },
    ],
    [
      'linkedin',
      {
        pattern: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
        errorMessage: 'Invalid Linkedin URL',
      },
    ],
    [
      'upwork',
      {
        pattern: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
        errorMessage: 'Invalid UpWork URL',
      },
    ],
  ],
);
