import { getCreatures } from "./data.js";

let cardsContainer = document.querySelector(".cards-container");
let detailSection = document.getElementById("detail");
let backBtn = document.getElementById("back-btn");


let allCreatures = [];
allCreatures = await getCreatures();
async function init(creatures) {

    
    cardsContainer.innerHTML = "";

    creatures.forEach((creature) => {
        const image = creature.sprites.other?.['official-artwork']?.front_default || creature.sprites.front_default;
        const primaryType = creature.types[0]?.type?.name || 'normal';
        const totalStats = creature.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

        // Notice we put data-id="${creature.id}" on the article tag
        cardsContainer.innerHTML += `
            <article class="flex flex-col gap-3 rounded-card bg-white p-3 pb-4 shadow-sm poke-card cursor-pointer" data-id="${creature.id}">
                <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
                    <img src="${image}" alt="${creature.name}" class="object-contain poke_img">
                    <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${creature.id}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <h3 class="font-display text-xl font-semibold capitalize">${creature.name}</h3>
                    <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink capitalize">${primaryType}</span>
                </div>
                <p class="text-sm text-muted">Total Stats: ${totalStats}</p>
                <button type="button" class="btn-outline">Ajouter à l'équipe</button>
            </article>
        `;
    });
}

init(allCreatures);

// -------------------------------------------------------------
// 2. DÉTAIL
// -------------------------------------------------------------

// Listen for clicks on the whole grid container (Event Delegation)
cardsContainer.addEventListener('click', (event) => {

    const card = event.target.closest('.poke-card');
    if (!card) return;


    const creatureId = Number(card.getAttribute('data-id'));


    const creature = allCreatures.find(c => c.id === creatureId);
    if (!creature) return;

    const image = creature.sprites.other?.['official-artwork']?.front_default || creature.sprites.front_default;
    const primaryType = creature.types[0]?.type?.name || 'normal';
    
    const hp = creature.stats[0]?.base_stat || 0;
    const attack = creature.stats[1]?.base_stat || 0;
    const defense = creature.stats[2]?.base_stat || 0;

    detailSection.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="font-mono text-sm text-muted">#${creature.id} · Détail</span>
            <button type="button" aria-label="Fermer le détail" class="btn-outline w-11 px-0" id="back-btn">✕</button>
        </div>
        <div class="flex h-48 items-center justify-center rounded-2xl bg-brand-light">
            <img src="${image}" alt="${creature.name}" class="h-40 object-contain">
        </div>
        <div class="flex items-center justify-between">
            <h2 class="font-display text-3xl font-extrabold capitalize">${creature.name}</h2>
            <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold capitalize">${primaryType}</span>
        </div>
        <p class="text-gray-700">Une créature unique prête pour l'aventure.</p>
        <div class="flex flex-col gap-2 text-sm">
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">PV</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 w-[${hp}%] rounded-full bg-brand"></span></span><span class="text-right font-mono">${hp}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Attaque</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 w-[${attack}%] rounded-full bg-brand"></span></span><span class="text-right font-mono">${attack}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Défense</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 w-[${defense}%] rounded-full bg-brand"></span></span><span class="text-right font-mono">${defense}</span></div>
        </div>
        <button type="button" class="btn-primary">Ajouter à l'équipe</button>
    `;

    //document.getElementById('back-btn').addEventListener('click', resetDetailView);
});
detailSection.addEventListener('click', (event) => {
    // Check if the clicked element (or its parent) is the back button
    const closeBtn = event.target.closest('#back-btn');
    if (!closeBtn) return;

    detailSection.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 text-center text-muted gap-2">
            <span class="text-xl font-semibold">Aucune créature sélectionnée</span>
            <p class="text-sm">Cliquez sur une carte pour voir ses détails ici.</p>
        </div>
    `;
});
// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------
const rech = document.querySelector("#search");
const tpSelect = document.querySelector("#typeFilter");

function searchFilter() {
  const text = rech.value.toLowerCase().trim();
  const type = tpSelect.value;

    const res = allCreatures.filter((creature) => {
    const perName = creature.name.toLowerCase().includes(text);
    const perType = type === "tous" || creature.types[0]?.type?.name || 'normal' === type;

    return perName && perType;
  });
  init(res);
}
rech.addEventListener("input", searchFilter);
tpSelect.addEventListener("click", searchFilter);

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
