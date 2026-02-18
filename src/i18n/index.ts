import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonPtBR from './locales/pt-BR/common.json';
import homePtBR from './locales/pt-BR/home.json';
import storiesPtBR from './locales/pt-BR/stories.json';
import contentPtBR from './locales/pt-BR/content.json';
import operationsPtBR from './locales/pt-BR/operations.json';
import eventsPtBR from './locales/pt-BR/events.json';
import guidesPtBR from './locales/pt-BR/guides.json';
import updatesPtBR from './locales/pt-BR/updates.json';
import earlyGamePtBR from './locales/pt-BR/earlyGame.json';
import midGamePtBR from './locales/pt-BR/midGame.json';
import endgamePtBR from './locales/pt-BR/endgame.json';
import introPtBR from './locales/pt-BR/intro.json';
import hudPtBR from './locales/pt-BR/hud.json';
import storyArcPtBR from './locales/pt-BR/storyArc.json';
import classStoryGuidePtBR from './locales/pt-BR/classStoryGuide.json';
import levelingPtBR from './locales/pt-BR/leveling.json';

import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import storiesEn from './locales/en/stories.json';
import contentEn from './locales/en/content.json';
import operationsEn from './locales/en/operations.json';
import eventsEn from './locales/en/events.json';
import guidesEn from './locales/en/guides.json';
import updatesEn from './locales/en/updates.json';
import earlyGameEn from './locales/en/earlyGame.json';
import midGameEn from './locales/en/midGame.json';
import endgameEn from './locales/en/endgame.json';
import introEn from './locales/en/intro.json';
import hudEn from './locales/en/hud.json';
import storyArcEn from './locales/en/storyArc.json';
import classStoryGuideEn from './locales/en/classStoryGuide.json';
import levelingEn from './locales/en/leveling.json';

const resources = {
  'pt-BR': {
    common: commonPtBR,
    home: homePtBR,
    stories: storiesPtBR,
    content: contentPtBR,
    operations: operationsPtBR,
    events: eventsPtBR,
    guides: guidesPtBR,
    updates: updatesPtBR,
    earlyGame: earlyGamePtBR,
    midGame: midGamePtBR,
    endgame: endgamePtBR,
    intro: introPtBR,
    hud: hudPtBR,
    storyArc: storyArcPtBR,
    classStoryGuide: classStoryGuidePtBR,
    leveling: levelingPtBR,
  },
  en: {
    common: commonEn,
    home: homeEn,
    stories: storiesEn,
    content: contentEn,
    operations: operationsEn,
    events: eventsEn,
    guides: guidesEn,
    updates: updatesEn,
    earlyGame: earlyGameEn,
    midGame: midGameEn,
    endgame: endgameEn,
    intro: introEn,
    hud: hudEn,
    storyArc: storyArcEn,
    classStoryGuide: classStoryGuideEn,
    leveling: levelingEn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    defaultNS: 'common',
    ns: ['common', 'home', 'stories', 'content', 'operations', 'events', 'guides', 'updates', 'earlyGame', 'midGame', 'endgame', 'intro', 'hud', 'storyArc', 'classStoryGuide', 'leveling'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
