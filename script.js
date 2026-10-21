import { getCreatures } from "./data.js";
// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------

let cardsContainer = document.querySelector(".cards-container");

async function init() {
    const creatures = await getCreatures();
    console.log(creatures);
    
    cardsContainer.innerHTML = "";

    creatures.forEach((creature) => {
        const image = creature.sprites.other?.['official-artwork']?.front_default || creature.sprites.front_default;
        
        const primaryType = creature.types[0]?.type?.name || 'normal';

        const totalStats = creature.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

        cardsContainer.innerHTML += `
            <article class="flex flex-col gap-3 rounded-card bg-white p-3 pb-4 shadow-sm">
                <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
                    <img src="${image}" alt="${creature.name}" class="object-contain poke_img">
                    <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${creature.id}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <h3 class="font-display text-xl font-semibold capitalize">${name}</h3>
                    <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink capitalize">${primaryType}</span>
                </div>
                <p class="text-sm text-muted">Total Stats: ${totalStats}</p>
                <button type="button" class="btn-outline">Ajouter à l'équipe</button>
            </article>
        `;
    });
}

init();

// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------
