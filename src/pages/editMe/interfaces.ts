import type { AppUserEditFields } from '@src/entities/user';

type MeEditKeys = keyof AppUserEditFields;

type MeEditFieldType = 'input' | 'textarea';

interface MeEditFieldModel {
  required: string | boolean;
  label: string;
  fieldType?: MeEditFieldType;
}

export type { MeEditKeys, MeEditFieldModel, MeEditFieldType };
