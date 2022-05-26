const picture = document.querySelector("#picture");
const name = document.querySelector("#name");
const flag = document.querySelector(".flag");
const country = document.querySelector(".country-name");
const details = document.querySelector(".details");
const temperamentContainer = document.querySelector(".temperament-wrapper");
const skillsWrapper = document.querySelector(".skills-wrapper");
const wikipediaButton = document.querySelector("#wiki-btn");
const newCatButton = document.querySelector("#new-cat-btn");

async function fetchAllCats() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const cats =  await response.json();
  return cats;
}

async function getAllCatsIds() {
  const cats = await fetchAllCats();
  const ids = cats.map(cat => cat.id);
  return ids;
}

async function getRandomCat() {
  const catsIds = await getAllCatsIds();
  const catId = catsIds[Math.floor(Math.random() * catsIds.length)];

  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catId}`);
  const catArray = await response.json();
  return catArray[0];
}

async function loadRandomCat() {
  const cat = await getRandomCat();

  const catBreeds = cat.breeds[0];

  picture.src = cat.url; 
  name.innerText = catBreeds.name
  flag.src = getFlagURL(catBreeds.country_code);
  country.innerText = catBreeds.origin; 
  details.innerText = catBreeds.description;
  temperamentContainer.innerHTML =  catBreeds.temperament.trim().split(',').map(temperament => {
    return `<span class="temperament"> ${temperament} </span>`;
  });
  skillsWrapper.innerHTML = `
  <div class="skill-wrapper">
    <span class="skill">Affection level:</span>
    <div class="skill-stars-wrapper">
      ${ getStar(catBreeds.affection_level >= 1)}
      ${ getStar(catBreeds.affection_level >= 2)}
      ${ getStar(catBreeds.affection_level >= 3)}
      ${ getStar(catBreeds.affection_level >= 4)}
      ${ getStar(catBreeds.affection_level >= 5)}
    </div>
  </div>

  <div class="skill-wrapper">
    <span class="skill">Adaptability:</span>
    <div class="skill-stars-wrapper">
      ${ getStar(catBreeds.adaptability >= 1)}
      ${ getStar(catBreeds.adaptability >= 2)}
      ${ getStar(catBreeds.adaptability >= 3)}
      ${ getStar(catBreeds.adaptability >= 4)}
      ${ getStar(catBreeds.adaptability >= 5)}
    </div>
  </div>

  <div class="skill-wrapper">
    <span class="skill">Energy level:</span>
    <div class="skill-stars-wrapper">
      ${ getStar(catBreeds.energy_level >= 1)}
      ${ getStar(catBreeds.energy_level >= 2)}
      ${ getStar(catBreeds.energy_level >= 3)}
      ${ getStar(catBreeds.energy_level >= 4)}
      ${ getStar(catBreeds.energy_level >= 5)}
    </div>
  </div>

  <div class="skill-wrapper">
    <span class="skill">Intelligence:</span>
    <div class="skill-stars-wrapper">
      ${ getStar(catBreeds.intelligence >= 1)}
      ${ getStar(catBreeds.intelligence >= 2)}
      ${ getStar(catBreeds.intelligence >= 3)}
      ${ getStar(catBreeds.intelligence >= 4)}
      ${ getStar(catBreeds.intelligence >= 5)}
    </div>
  </div>

  <div class="skill-wrapper">
    <span class="skill">Social needs:</span>
    <div class="skill-stars-wrapper">
      ${ getStar(catBreeds.social_needs >= 1)}
      ${ getStar(catBreeds.social_needs >= 2)}
      ${ getStar(catBreeds.social_needs >= 3)}
      ${ getStar(catBreeds.social_needs >= 4)}
      ${ getStar(catBreeds.social_needs >= 5)}
    </div>
  </div>
  `;

  wikipediaButton.href = catBreeds.wikipedia_url;
}

loadRandomCat();

function getFlagURL(country) {
  return `https://flagcdn.com/16x12/${country.toLowerCase()}.png`
}

function getStar(isHighlighted = false) {
  if (isHighlighted) {
    return `<img
              src="assets/images/icons/star-active.svg"
              alt="Image of star with represents a 'point' in the skill"
            />`;
  }
  return `<img
            src="assets/images/icons/star.svg"
            alt="Image of star with represents a 'point' in the skill"
          />`;
}


//add events
newCatButton.addEventListener('click',() => {
 loadRandomCat();
})