import { forEach, toPairs } from 'lodash';
import type { TranslationsMap, DictionaryI18N } from './interfaces';

const getI18NResources = (m: TranslationsMap) => {
  const dictCache: DictionaryI18N = {};

  forEach(m, (engMap, targetkey) => {
    toPairs(engMap).forEach(([langKey, lanVal]) => {
      if (!(langKey in dictCache)) {
        //@ts-expect-error
        dictCache[langKey] = { translation: {} };
      }

      //@ts-expect-error
      dictCache[langKey].translation[targetkey] = lanVal;
    });
  });

  return dictCache;
};

export { getI18NResources };
