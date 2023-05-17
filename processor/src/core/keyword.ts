import { Keyword, TechStack } from '@techstack-ranking/database';

export const entryLevelKeywords = [
  'fresh graduate',
  'junior',
  'entry level',
  'self-taught',
  'self-learn',
  'self taught',
  'self learn',
];

export function getEntryLevelKeywords() {
  return entryLevelKeywords;
}

//create map keyword to category
let techStackMap = new Map<string, TechStack>();
export async function buildTechStackMap() {
  const techStackKeywords = await Keyword.findAll();

  for (const keyword of techStackKeywords) {
    const techStack = await keyword.getTechStack();
    techStackMap.set(keyword.dataValues.value, techStack);
  }

  return techStackMap;
}

export function getTechStackMap() {
  return techStackMap;
}

let techStackKeywords: string[] = [];
export async function loadTechStackKeywords() {
  const keywords = await Keyword.findAll();
  techStackKeywords = keywords.map((k) => k.dataValues.value);
  return techStackKeywords;
}

export function getTechStackKeywords() {
  return techStackKeywords;
}
