import React, { createContext, useContext } from 'react';

import type { AppBotname, AppGlobalCTX } from '@src/app';

const AppContext = createContext<AppGlobalCTX>({ botname: null, chatId: null });
const useAppContext = () => useContext(AppContext);

const AppContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const searchParams = new URLSearchParams(window.location.search);

  return (
    <AppContext.Provider
      value={{
        botname: searchParams.get('botname') as AppBotname,
        chatId: searchParams.get('stamp'),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext, useAppContext };
