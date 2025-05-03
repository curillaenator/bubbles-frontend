interface AppUser {
  uid: string | null;
}

interface AppUserCreds {
  email: string;
  password: string;
}

interface AppUserEditFields {
  botNameEn: string;
  botNameRu: string;

  telegram: string;
  whatsapp: string;

  bannerTitleEn: string;
  bannerTitleRu: string;

  bannerSloganEn: string;
  bannerSloganRu: string;

  headEn: string;
  headRu: string;

  sloganEn: string;
  sloganRu: string;

  pricingEn: string;
  pricingRu: string;

  bodyEn: string;
  bodyRu: string;

  skillsEn: string;
  skillsRu: string;

  photoURL: FileList | string;

  // unused fake form key, allows separator as fields, never registered
  separator: string;
}

export type { AppUser, AppUserCreds, AppUserEditFields };
