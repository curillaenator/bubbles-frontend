import type { MeEditKeys, MeEditFieldModel } from './interfaces';

const FORM_MODEL: [MeEditKeys, MeEditFieldModel][] = [
  ['headEn', { required: false, label: 'Greatings En', fieldType: 'input' }],
  ['headRu', { required: false, label: 'Приветствие RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-1' }],

  ['sloganEn', { required: false, label: 'Slogan En', fieldType: 'input' }],
  ['sloganRu', { required: false, label: 'Слоган RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-2' }],

  ['pricingEn', { required: false, label: 'Pricing text En', fieldType: 'input' }],
  ['pricingRu', { required: false, label: 'Текст с ценником RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-3' }],

  ['bodyEn', { required: false, label: 'Body text En', fieldType: 'textarea' }],
  ['bodyRu', { required: false, label: 'Тект карточки RU', fieldType: 'textarea' }],

  ['separator', { required: false, label: 'form-separator-key-4' }],

  ['skillsEn', { required: false, label: 'Skills En', fieldType: 'textarea' }],
  ['skillsRu', { required: false, label: 'Навыки RU', fieldType: 'textarea' }],
];

export { FORM_MODEL };
