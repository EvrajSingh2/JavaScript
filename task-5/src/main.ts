import { FilterValue, type Beer } from "./types";

const mainUrl: string = "https://punkapi-alxiw.amvera.io/v3/";

const mainDiv = document.getElementById("mainDiv") as HTMLDivElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const container = document.getElementById("cardContainer") as HTMLDivElement;
const currPage = document.getElementById("currPage") as HTMLSpanElement;
const filter = document.getElementById("filter") as HTMLSelectElement;

let searchBeer: string = "";
let pageNumber: number = 1;
let filtVal: string = "";

async function loadBeer(page: number) {
  let url: string = `${mainUrl}beers?page=${page}&per_page=32`;

  if (searchBeer) {
    url += `&beer_name=${searchBeer}`;
  }

  if (filtVal === FilterValue.ABVG) {
    url += `&abv_gt=5`
  } else if (filtVal === FilterValue.ABVL) {
    url += `&abv_lt=5`
  } else if (filtVal === FilterValue.BrewedA) {
    url += `&brewed_after=06-2008`;
  } else if (filtVal === FilterValue.BrewedB) {
    url += `&brewed_before=06-2008`;
  }

  const resp: Response = await fetch(url);
  const beers: Beer[] = await resp.json();

  if (beers.length === 0) {
    container.innerHTML = `
    <p class="st:w-full st:text-center st:text-red-500">No Beers Found </p>
    `
    return;
  }

  container.innerHTML = "";

  beers.forEach((beer: Beer) => {
    let card = document.createElement("div");
    card.className = "st:bg-gray-200 st:border st:border-gray-300 st:w-[48%] st:md:w-[32%] st:lg:w-[24%] st:rounded-[20px] st:p-[10px] st:hover:scale-[101%]"

    card.innerHTML = `
    <div class="st:flex st:flex-col st:justify-center st:gap-[5px]">
       <div class="st:flex st:justify-center st:bg-white st:py-[10px] st:rounded-[10px]">
           <img src="${mainUrl + "images/" + beer.image}" alt="Beer" class="st:h-[200px]">
           </div>
        <div class="st:flex st:my-[10px]">
        <p class="st:text-[28px] st:text-gray-800 st:font-[600]">${beer.name}</p></div>
        <p class="st:text-[20px] st:text-amber-600 st:font-[400]">Tagline: ${beer.tagline}</p>
        <p class="st:text-[20px] st:font-[400]">First Brewed: ${beer.first_brewed}</p>
        <p class="st:text-[20px] st:font-[400]">ABV: ${beer.abv}</p>
    </div>
    `;
    container.appendChild(card);
  });

  currPage.textContent = `Page ${pageNumber}`;
}

mainDiv?.addEventListener("click", function (event: Event) {
  if (event?.target instanceof HTMLElement) {
    if (event.target.classList?.contains("searchBtn")) {
      searchBeer = searchInput.value.trim();
      pageNumber = 1;
      loadBeer(pageNumber);
    }
    if (event.target.classList?.contains("nextBtn")) {
      pageNumber++;
      loadBeer(pageNumber);
    }
    if (event.target.classList?.contains("prevBtn")) {
      if (pageNumber > 1) {
        pageNumber--;
        loadBeer(pageNumber);
      }
    }
  }
});

searchInput?.addEventListener("input", () => {
  searchBeer = searchInput.value.trim();
  pageNumber = 1;
  loadBeer(pageNumber);
})

filter?.addEventListener("change", () => {
  filtVal = filter.value;
  pageNumber = 1;
  loadBeer(pageNumber);
})

loadBeer(pageNumber);

