import type { MeEditKeys, MeEditFieldModel } from './interfaces';

const FORM_MODEL: [MeEditKeys, MeEditFieldModel][] = [
  ['headEn', { required: 'required', label: 'Greatings En', fieldType: 'input' }],
  ['headRu', { required: 'required', label: 'Приветствие RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-1' }],

  ['sloganEn', { required: 'required', label: 'Slogan En', fieldType: 'input' }],
  ['sloganRu', { required: 'required', label: 'Слоган RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-2' }],

  ['pricingEn', { required: 'required', label: 'Pricing text En', fieldType: 'input' }],
  ['pricingRu', { required: 'required', label: 'Текст с ценником RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-3' }],

  ['bodyEn', { required: 'required', label: 'Body text En', fieldType: 'textarea' }],
  ['bodyRu', { required: 'required', label: 'Тект карточки RU', fieldType: 'textarea' }],

  ['separator', { required: false, label: 'form-separator-key-4' }],

  ['skillsEn', { required: 'required', label: 'Skills En', fieldType: 'textarea' }],
  ['skillsRu', { required: 'required', label: 'Навыки RU', fieldType: 'textarea' }],
];

export { FORM_MODEL };
