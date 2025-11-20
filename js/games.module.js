import { Details } from "./details.module.js";
import { Ui } from "./ui.js";

const rapidApiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "93cd8ddb0dmshc75e3dcdd450b07p1f275cjsnb4a61d05eeec",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export class Games {
  constructor() {
    this.ui = new Ui();

    this.getGames("mmorpg");

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        document.querySelector(".menu .active").classList.remove("active");
        e.target.classList.add("active");
        this.getGames(e.target.dataset.category);
      });
    });
  }

  async getGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    try {
      const api = await fetch(
        `
        https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        rapidApiOptions
      );

      if (!api.ok) throw new Error(`API error: ${api.status}`);

      const data = await api.json();
      this.ui.displayDataGame(data);

      this.startEvent();
    } catch (err) {
      console.error(err);
    } finally {
      loading.classList.add("d-none");
    }
  }

  startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.id;
        this.showDetails(id);
      });
    });
  }

  showDetails(idGame) {
    new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}
