// Cap Web — câblage : lire le formulaire, mettre à jour l'historique, demander l'affichage.
import { validateMessage, replyTo, LIMITE, estMessage } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');
const effacer = document.querySelector('#effacer');
const versionElt = document.querySelector('#version');
const limiteElt = document.querySelector('#limite');
const compteur = document.querySelector('#compteur');

const CLE = 'capweb.historique';
const historique = [];

function sauvegarder() {
  localStorage.setItem(CLE, JSON.stringify(historique));
}

function charger() {
  const brut = localStorage.getItem(CLE);
  if (brut === null) {
    return;
  }
  try {
    const donnees = JSON.parse(brut);
    if (Array.isArray(donnees)) {
      historique.push(...donnees.filter(estMessage));
    }
  } catch {
    statut.textContent = 'Conversation précédente illisible : nouvelle conversation.';
  }
}

async function demanderConseil() {
  try {
    const reponse = await fetch('/api/conseil', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error('réponse du serveur invalide');
    }
    const donnees = await reponse.json();
    if (typeof donnees.conseil !== 'string' || donnees.conseil.trim() === '') {
      throw new Error('conseil invalide');
    }
    return donnees.conseil;
  } catch {
    return 'Le serveur ne répond pas : conseil indisponible.';
  }
}

formulaire.addEventListener('submit', async (event) => {
  event.preventDefault();
  const controle = validateMessage(champ.value);
  if (!controle.ok) {
    statut.textContent = controle.error;
    champ.focus();
    return;
  }
  historique.push({ role: 'user', text: controle.value });
  const texte = controle.value.trim().toLowerCase() === 'conseil'
    ? await demanderConseil()
    : replyTo(controle.value);
  historique.push({ role: 'assistant', text: texte });
  sauvegarder();
  renderMessages(historique, liste);
  champ.value = '';
  afficherCompteur();
  statut.textContent = '';
  champ.focus();
});

effacer.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }
  historique.length = 0;
  localStorage.removeItem(CLE);
  renderMessages(historique, liste);
  statut.textContent = 'Conversation effacée.';
});

function afficherCompteur() {
  compteur.textContent = `${champ.value.length} / ${LIMITE}`;
}

champ.addEventListener('input', afficherCompteur);

champ.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    formulaire.requestSubmit();
  }
});

// La limite vient de brain.js : un seul endroit à modifier.
limiteElt.textContent = String(LIMITE);
afficherCompteur();

charger();
renderMessages(historique, liste);

async function afficherVersion() {
  try {
    const reponse = await fetch('/version.json', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error('version indisponible');
    }
    const donnees = await reponse.json();
    versionElt.textContent = `version ${donnees.version}`;
  } catch {
    versionElt.textContent = 'version indisponible';
  }
}

afficherVersion();
