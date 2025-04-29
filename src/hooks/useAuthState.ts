import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/configs/firebase.config';
import { setUid } from '@src/entities/user';

const useAuthState = () => {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    setAppLoading(true);

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUid({ uid: null });
        setAppLoading(false);
        return;
      }

      setUid({ uid: user.uid });
      setAppLoading(false);
    });

    return () => unsubAuth();
  }, []);

  return { appLoading };
};

export { useAuthState };
