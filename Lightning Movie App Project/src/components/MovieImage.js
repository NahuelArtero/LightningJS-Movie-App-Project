import { Lightning } from "@lightningjs/sdk";

export class MovieImage extends Lightning.Component {
  static _template() {
    return {
      transitions: {
        x: {
          duration: 0.5,
          timingFunction: "cubic-bezier(0.17, 0.9, 0.32, 1.3)",
        },
      },
      MovieTitle: {
        y: 400,
        w: 280,
        color: 0xffffffff,
        text: {
          text: this.bindProp("title"),
          fontSize: 45,
        },
      },
    };
  }

  _focus() {
    this.patch({
      smooth: {
        w: 360,
        h: 480,
        y: -100,
      },
    });

    this.patch({
      MovieTitle: {
        color: 0xffcebf35,
        text: {
          fontSize: 55,
        },
        y: 530,
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: {
        w: 250,
        h: 350,
        y: 0,
      },
    });
    this.patch({
      MovieTitle: {
        color: 0xffffffff,
        text: {
          fontSize: 45,
        },
        y: 400,
      },
    });
  }
}
