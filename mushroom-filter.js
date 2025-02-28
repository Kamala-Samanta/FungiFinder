
const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noResultsMessage = document.querySelector(".no-matches");

function setHidden(){
  cards.forEach((card)=>{
    card.setAttribute("hidden", true);
  });
}



const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index)=>{
 const mushroomId = `mushroom-${index + 1}`;
 card.style.viewTransitionName = `card-${mushroomId}`;
});

seasonalFilter.addEventListener("change",updateFilter);
edibleFilter.addEventListener("change",updateFilter);


function updateFilter(e){
    const filterType = e.target.id;
    // console.log(filterType);
    // console.log(e.target.value);
    currentFilters[filterType]=e.target.value;
    if(!document.startViewTransition()){
      filterCards();
      return;
    }
    document.startViewTransition(()=>filterCards());

}


function filterCards(){
  setHidden();
  let hasvisibleCards = false;
  cards.forEach((card)=>{
    const season = card.querySelector('[data-season]').dataset.season;
    const edible = card.querySelector('[data-edible]').dataset.edible;
    // console.log(season,edible);
    const matchesSeason = currentFilters.season === season;
    const matchesEdible = currentFilters.edible === edible;

    if((matchesEdible || currentFilters.edible === 'all') && (matchesSeason || currentFilters.season === 'all')){
      card.hidden = false;
      hasvisibleCards = true;
    }

    // console.log(hasvisibleCards)

    if(hasvisibleCards){
      noResultsMessage.hidden = true;
    }else{
      noResultsMessage.hidden = false;
    }
   
  });
}

//for computers with javascript enabled, show the filters 
function enableFiltering(){
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}

enableFiltering();
