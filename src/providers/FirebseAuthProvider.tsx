import React from 'react';

import { useAuthState } from '@src/hooks/useAuthState';
import { FullsizeLoader } from '@src/features/loader';

const FirebaseAuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { appLoading } = useAuthState();
  if (appLoading) return <FullsizeLoader fs />;
  return children;
};

export { FirebaseAuthProvider };
