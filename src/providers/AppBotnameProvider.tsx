import React, { useState, useEffect, createContext, useContext } from 'react';

import type { AppBotname, AppGlobalCTX } from '@src/app';

const AppContext = createContext<AppGlobalCTX>({ botname: null });
const useAppContext = () => useContext(AppContext);

const AppBotnameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [botname, setBotName] = useState<AppBotname | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setBotName(searchParams.get('botname') as AppBotname);
  }, []);

  return <AppContext.Provider value={{ botname }}>{children}</AppContext.Provider>;
};

export { AppBotnameProvider, AppContext, useAppContext };
