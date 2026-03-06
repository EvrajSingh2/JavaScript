const mainUrl = "https://punkapi-alxiw.amvera.io/v3/";
const searchInput = document.getElementById("inputCan")
const searchBtn = document.getElementById("searchBtn");
const container = document.getElementById("cardContainer");
const currPage = document.getElementById("currPage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const filter = document.getElementById("filter");


let searchBeer = "";
let pageNumber = 1;
let filtVal = "";

async function loadBeer(page) {
  let url = `${mainUrl}beers?page=${page}&per_page=32`;

  if (searchBeer) {
    url += `&beer_name=${searchBeer}`;
  }

  if (filtVal === "ABVG5") {
    url += `&abv_gt=5`;
  } else if (filtVal === "ABVL5") {
    url += `&abv_lt=5`;
  } else if (filtVal === "brewedA") {
    url += `&brewed_after=06-2008`;
  } else if (filtVal === "brewedB") {
    url += `&brewed_before=06-2008`;
  }

  const resp = await fetch(url);
  const beers = await resp.json();

  if (beers.length === 0) {
    container.innerHTML = `
    <p class="st:w-full st:text-center st:text-red-500">No Beers Found </p>
    `
    return;
  }

  container.innerHTML = "";

  beers.forEach(beer => {
    let card = document.createElement("div");
    card.className = "st:bg-gray-200  st:w-[48%] st:md:w-[32%] st:lg:w-[24%] st:rounded-[20px] st:p-[10px] st:hover:scale-[101%]"

    card.innerHTML = `
    <div class="st:flex st:flex-col st:justify-center st:gap-[5px]">
       <div class="st:flex st:justify-center st:bg-amber-50 st:py-[10px] st:rounded-[10px]">
           <img src="${mainUrl + "images/" + beer.image}" alt="Beer" class="st:h-[200px]">
           </div>
        <div class="st:flex st:justify-center st:my-[10px]">
        <p class="st:text-[28px] st:text-gray-800 st:font-[400]">${beer.name}</p></div>
       <p class="st:text-[20px] st:text-amber-600 st:font-[400]">Tagline: ${beer.tagline}</p>
       <p class="st:text-[20px] st:font-[400]">First Brewed: ${beer.first_brewed}</p>
       <p class="st:text-[20px] st:font-[400]">ABV: ${beer.abv}</p>
    </div>
    `;
    container.appendChild(card);
  });

  currPage.textContent = `Page ${pageNumber}`;
}

nextBtn.addEventListener('click', () => {
  pageNumber++;
  loadBeer(pageNumber);
})

prevBtn.addEventListener('click', () => {
  if (pageNumber > 1) {
    pageNumber--;
    loadBeer(pageNumber);
  }
})

searchBtn.addEventListener('click', () => {
  searchBeer = searchInput.value;
  pageNumber = 1;
  loadBeer(pageNumber);
})

searchInput.addEventListener('input', () => {
  searchBeer = searchInput.value;
  pageNumber = 1;
  loadBeer(pageNumber);
})

filter.addEventListener('change', () => {
  filtVal = filter.value;
  pageNumber = 1;
  loadBeer(pageNumber);
})

loadBeer(pageNumber);
