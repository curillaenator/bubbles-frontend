interface AppUser {
  uid: string | null;
}

interface AppUserCreds {
  email: string;
  password: string;
}

interface AppUserBullet {
  id: string;
  emoji: string;
  ru: string;
  en: string;
}

interface AppUserEditFields {
  botNameEn: string;
  botNameRu: string;

  telegram: string;
  whatsapp: string;

  headEn: string;
  headRu: string;

  pricingEn: string;
  pricingRu: string;

  bodyEn: string;
  bodyRu: string;

  photoURL: FileList | string;

  bullets: AppUserBullet[];

  // unused fake form key, allows separator as fields, never registered
  separator: string;
}

export type { AppUser, AppUserCreds, AppUserEditFields, AppUserBullet };
