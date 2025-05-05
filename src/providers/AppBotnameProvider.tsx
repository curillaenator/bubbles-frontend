import React, { useState, useEffect, createContext, useContext } from 'react';

import type { AppBotname, AppGlobalCTX } from '@src/app';

const AppContext = createContext<AppGlobalCTX>({ botname: null, chatId: null });
const useAppContext = () => useContext(AppContext);

const AppBotnameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [value, setBotName] = useState<AppGlobalCTX>({ botname: null, chatId: null });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    setBotName({
      botname: searchParams.get('botname') as AppBotname,
      chatId: searchParams.get('stamp'),
    });
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppBotnameProvider, AppContext, useAppContext };
