import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { getMovie } from "../lib/ApiEndpoint";
import { MovieImage } from "../Components/MovieImage";

export class Home extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff111111,
      },
      Title: {
        x: 960,
        y: 100,
        mount: 0.5,
        color: 0xff853d8c,
        text: {
          text: "Movies",
          fontSize: 80,
        },
      },
      MovieImage: {
        x: 10,
        y: 270,
        flex: {
          direction: "row",
        },
      },
      NavIndicator: {
        x: 75,
        y: 75,
        flex: {},
        mount: 0.5,
        Arrow: {
          w: 25,
          h: 25,
          src: Utils.asset("images/arrow.png"),
          rotation: Math.PI * -1,
        },
        Label: {
          x: 7,
          y: -15,
          text: {
            text: "Menu",
          },
        },
      },
    };
  }

  pageTransition() {
    return "fade";
  }
  async _init() {
    const apiKey = "6a14d23246055d83ff2601d0d3a62da3";
    let data = await getMovie();
    let movieData = [];
    data.results.map((contentItem) => {
      movieData.push({
        w: 250,
        h: 350,

        flexItem: {
          margin: 25,
        },

        title: contentItem.title,
        overview: contentItem.overview,
        releaseDate: contentItem.release_date,
        movieID: contentItem.id,

        type: MovieImage,
        src:
          "https://image.tmdb.org/t/p/w500" +
          contentItem.poster_path +
          "?api_key=" +
          apiKey,
      });
    });

    this.tag("MovieImage").children = movieData;

    for (let j = 0; j < movieData.length; j++) {}
    this.index = 0;

    this.animation = this.tag("Title").animation({
      duration: 5,
      repeat: -1,
      actions: [
        {
          p: "text.text",
        },
        {
          p: "x",
          v: {
            0: 990,
            0.5: 1010,
            1: 990,
          },
        },
      ],
    });
    this.animation.start();
  }

  _handleLeft() {
    if (this.index > 0) {
      this.index--;
    } else {
      Router.focusWidget("Menu");
    }
    if (this.index > 1)
      this.tag("MovieImage").patch({
        smooth: { x: 500 - (this.index - 1) * 270 },
      });
    else {
      this.tag("MovieImage").patch({ smooth: { x: 500 } });
    }
  }

  _handleRight() {
    if (this.index < this.tag("MovieImage").children.length - 1) {
      this.index++;
    }
    if (this.index > 1)
      this.tag("MovieImage").patch({
        smooth: { x: 300 - (this.index - 1) * 270 },
      });
  }

  getActiveItem() {
    return this.tag("MovieImage").children[this.index];
  }

  _getFocused() {
    return this.getActiveItem();
  }

  _handleEnter() {
    let asset = this.getActiveItem();
    Router.navigate("Movie", {
      src: asset.src,
      title: asset.title,
      overview: asset.overview,
      releaseDate: asset.releaseDate,
      id: asset.movieID,
    });
  }
}
