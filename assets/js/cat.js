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
  const cat = await response.json();
  return cat;
}

async function loadingInitalCat() {
  const cat = await getRandomCat();
  console.log(cat);
}

loadingInitalCat();