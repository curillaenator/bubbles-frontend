import React from 'react';

import { useAppContext } from '@src/providers/AppBotnameProvider';

import { DivebotLogo } from './assets/DivebotLogo';

interface AppLogoProps {
  size?: number | 'adaptive';
}

const LOGO_COMPONENTNS: Record<string, React.FC<AppLogoProps>> = {
  divebot: DivebotLogo,
};

const Logo: React.FC<AppLogoProps> = (props) => {
  const { botname } = useAppContext();

  if (!botname) return null;

  const LogoComponent = LOGO_COMPONENTNS[botname];

  return <LogoComponent {...props} />;
};

export { Logo };
