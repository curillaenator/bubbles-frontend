import { getI18NResources } from './utils';
import { translations } from './dictionary';

const resources = getI18NResources(translations);

export { resources };
export * from './interfaces';
