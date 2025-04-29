interface AppUser {
  uid: string | null;
}

interface AppUserCreds {
  email: string;
  password: string;
}

export type { AppUser, AppUserCreds };
