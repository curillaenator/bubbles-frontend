import React from 'react';

import { useAppContext } from '@src/providers/AppContextProvider';
import type { AppBotname } from '@src/app';

import { DivebotLogo } from './assets/DivebotLogo';
import { LashesLogo } from './assets/LashesLogo';
import { FleaLogo } from './assets/Flea';

interface AppLogoProps {
  size?: number | 'adaptive';
}

const LOGO_COMPONENTNS: Record<AppBotname, React.FC<AppLogoProps>> = {
  divebot: DivebotLogo,
  lashes: LashesLogo,
  flea: FleaLogo,
};

const Logo: React.FC<AppLogoProps> = (props) => {
  const { botname } = useAppContext();

  if (!botname) return null;

  const LogoComponent = LOGO_COMPONENTNS[botname];

  return <LogoComponent {...props} />;
};

export { Logo };
