import type { TelegramWebApps } from 'telegram-webapps-types';

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }

  interface AppUserCreds {
    email: string;
    password: string;
    error?: string;
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const path: string;
  export default path;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}
