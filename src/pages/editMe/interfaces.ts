interface MeEditFields {
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

  photoURL: FileList;

  // unused fake form key, allows separator as fields, never registered
  separator: string;
}

type MeEditKeys = keyof MeEditFields;

type MeEditFieldType = 'input' | 'textarea';

interface MeEditFieldModel {
  required: string | boolean;
  label: string;
  fieldType?: MeEditFieldType;
}

export type { MeEditKeys, MeEditFieldModel, MeEditFields, MeEditFieldType };
