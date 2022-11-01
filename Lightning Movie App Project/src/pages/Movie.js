import { Lightning, Utils } from "@lightningjs/sdk";
import { getSimilarMovies } from "../lib/ApiEndpoint";

export class Movie extends Lightning.Component {
  static _template() {
    return {
      Backround: {
        x: 0,
        y: 0,
        w: 1920,
        h: 1080,
        color: 0xff000000,
        rect: true,
      },
      Poster: {
        Backround: {
          w: 400,
          h: 600,
          x: 1200,
          y: 150,
          rect: true,
        },
      },
      MenuLogo: {
        x: 1800,
        y: 5,
        w: 110,
        h: 150,
        src: Utils.asset("images/backgroundLogo.png"),
      },
      MovieName: {
        x: 200,
        y: 200,
        color: 0xffcebf35,
        text: {
          text: "No Movie Name",
          fontSize: 70,
        },
      },

      MovieDetails: {
        x: 200,
        y: 300,
        w: 900,
        color: 0xffffffff,
        text: {
          text: "No Moview Overview",
          fontSize: 40,
        },
      },

      ReleaseDate: {
        x: 200,
        y: 100,
        w: 900,
        color: 0xffffffff,
        text: {
          text: "No Release Date",
          fontSize: 25,
        },
      },

      SimilarMovies: {
        x: 200,
        y: 700,
        color: 0xffcebf35,
        text: {
          text: "Similar Movies",
          fontSize: 60,
        },
        flex: {
          direction: "row",
        },
      },
    };
  }

  async _init() {}

  set params(args) {
    this.tag("Poster").patch({ Backround: { src: args.src } });
    this.tag("MovieName").patch({ text: { text: args.title } });
    this.tag("MovieDetails").patch({ text: { text: args.overview } });
    this.tag("ReleaseDate").patch({
      text: { text: "Release Date:" + args.releaseDate },
    });

    this.movieID = args.id;
    this.getSimilar();
  }

  async getSimilar() {
    const apiKey = "6a14d23246055d83ff2601d0d3a62da3";
    let data = await getSimilarMovies(this.movieID);
    let movieData = [];
    data.results.map((contentItem) => {
      movieData.push({
        y: 50,
        flexItem: {
          margin: 20,
        },
        w: 140,
        h: 200,
        src:
          "https://image.tmdb.org/t/p/w500" +
          contentItem.poster_path +
          "?api_key=" +
          apiKey,
      });
    });

    this.tag("SimilarMovies").children = movieData.slice(0, 8);

    for (let j = 0; j < movieData.length; j++) {}
  }
}
