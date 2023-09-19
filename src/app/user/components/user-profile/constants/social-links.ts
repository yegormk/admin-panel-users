import { IUserSocialLinksData } from 'src/app/shared/interfaces/user-social-links-data';

export const UserSocialLinksTitles = new Map<
  keyof IUserSocialLinksData,
  string
>([
  ['upwork', 'upwork'],
  ['github', 'github'],
  ['linkedin', 'linkedin'],
  ['telegramTag', 'Telegram'],
]);
