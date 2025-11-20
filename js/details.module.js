import { Ui } from "./ui.js";

const rapidApiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "93cd8ddb0dmshc75e3dcdd450b07p1f275cjsnb4a61d05eeec",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};

export class Details {
  constructor(id) {
    this.ui = new Ui();

    document.getElementById("btnClose").addEventListener("click", () => {
      document.querySelector(".games").classList.remove("d-none");
      document.querySelector(".details").classList.add("d-none");
    });

    this.getDetails(id);
  }

  async getDetails(idGames) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    try {
      const api = await fetch(
        `
        https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`,
        rapidApiOptions
      );

      if (!api.ok) throw new Error(api.status);

      const data = await api.json();
      this.ui.displayDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      loading.classList.add("d-none");
    }
  }
}
