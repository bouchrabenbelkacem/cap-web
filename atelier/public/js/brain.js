// Cap Web — cerveau à règles. Fonctions pures : aucun accès à la page.

// Vos réglages : recopiez ici la limite et les deux mots de votre cahier-personnel.json.
export const LIMITE = 250;

const MOTS = {
  cerise: 'Cerise : je peux vous présenter les films indépendants disponibles.',
  prairie: 'Prairie : je peux vous indiquer les horaires des prochaines séances.',
  affiche: 'Affiche : je peux vous décrire les films à l’affiche cette semaine.'
};

const motsConnusFormates = Object.keys(MOTS).map((mot) => `« ${mot} »`).join(' et ');

const REPONSES = {
  salut: 'Bonjour ! Je suis Cap Web, un assistant à règles. Écrivez « aide » pour voir ce que je sais faire.',
  aide: `Je connais « salut », « aide », « test », et ${Object.keys(MOTS).length} mots à moi : ${motsConnusFormates}.`,
  test: 'Test bien reçu : mes règles fonctionnent.',
  inconnu: 'Je n’ai pas compris. Écrivez « aide » pour voir ce que je sais faire.'
};

export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte.' };
  }
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Le message ne doit pas être vide.' };
  }
  if (value.length > LIMITE) {
    return { ok: false, error: `Le message doit contenir ${LIMITE} caractères au maximum.` };
  }
  return { ok: true, value };
}

export function estMessage(m) {
  return m !== null
    && typeof m === 'object'
    && (m.role === 'user' || m.role === 'assistant')
    && typeof m.text === 'string';
}

export function replyTo(message) {
  const texte = String(message).trim().toLowerCase();
  if (texte === 'salut' || texte === 'bonjour') {
    return REPONSES.salut;
  }
  if (texte === 'aide') {
    return REPONSES.aide;
  }
  if (texte === 'test') {
    return REPONSES.test;
  }
  if (Object.hasOwn(MOTS, texte)) {
    return MOTS[texte];
  }
  return REPONSES.inconnu;
}

const SYNONYMES = {
  coucou: 'salut',
  hello: 'salut',
  bonsoir: 'salut',
  help: 'aide',
  sos: 'aide'
};

export function synonyme(message) {
  if (typeof message !== 'string') {
    return '';
  }
  const texte = message.trim().toLowerCase();
  if (Object.hasOwn(SYNONYMES, texte)) {
    return SYNONYMES[texte];
  }
  return texte;
}

export function compterMots(message) {
  if (typeof message !== 'string') {
    return 0;
  }
  const texte = message.trim();
  if (texte === '') {
    return 0;
  }
  return texte.split(/\s+/).length;
}
