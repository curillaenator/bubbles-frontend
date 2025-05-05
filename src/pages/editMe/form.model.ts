import type { MeEditKeys, MeEditFieldModel } from './interfaces';

const FORM_MODEL: [MeEditKeys, MeEditFieldModel][] = [
  [
    'telegram',
    {
      required: false,
      label: 'Telegram',
      fieldType: 'input',
      description: 't.me/<your tg nick> or t.me/<your tel number>, example: t.me/JackBlack (no @ symbol)',
    },
  ],
  [
    'whatsapp',
    {
      required: false,
      label: 'Whatsapp',
      fieldType: 'input',
      description: 'wa.me/<your tel number>, example: wa.me/79xx8xx7x6x (no + symbol)',
    },
  ],

  ['separator', { required: false, label: 'form-separator-key-7' }],

  ['botNameEn', { required: false, label: 'Botname En', fieldType: 'input' }],
  ['botNameRu', { required: false, label: 'Название бота RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-8' }],

  // ['bannerTitleEn', { required: false, label: 'Banner title En', fieldType: 'input' }],
  // ['bannerTitleRu', { required: false, label: 'Заголовок баннера RU', fieldType: 'input' }],

  // ['separator', { required: false, label: 'form-separator-key-1' }],

  // ['bannerSloganEn', { required: false, label: 'Banner slogan En', fieldType: 'textarea' }],
  // ['bannerSloganRu', { required: false, label: 'Слоган баннера RU', fieldType: 'textarea' }],

  // ['separator', { required: false, label: 'form-separator-key-2' }],

  ['headEn', { required: false, label: 'Greatings En', fieldType: 'input' }],
  ['headRu', { required: false, label: 'Приветствие RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-3' }],

  // ['sloganEn', { required: false, label: 'Slogan En', fieldType: 'input' }],
  // ['sloganRu', { required: false, label: 'Слоган RU', fieldType: 'input' }],

  // ['separator', { required: false, label: 'form-separator-key-4' }],

  ['pricingEn', { required: false, label: 'Pricing text En', fieldType: 'input' }],
  ['pricingRu', { required: false, label: 'Текст с ценником RU', fieldType: 'input' }],

  ['separator', { required: false, label: 'form-separator-key-5' }],

  ['bodyEn', { required: false, label: 'Body text En', fieldType: 'textarea' }],
  ['bodyRu', { required: false, label: 'Тект карточки RU', fieldType: 'textarea' }],

  // ['separator', { required: false, label: 'form-separator-key-6' }],

  // ['skillsEn', { required: false, label: 'Skills En', fieldType: 'textarea' }],
  // ['skillsRu', { required: false, label: 'Навыки RU', fieldType: 'textarea' }],
];

export { FORM_MODEL };
