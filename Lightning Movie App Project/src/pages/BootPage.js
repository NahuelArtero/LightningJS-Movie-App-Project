import { Lightning, Router, Utils } from "@lightningjs/sdk";

export class BootPage extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff000000,
      },
      MenuLogo: {
        x: 710,
        y: 190,
        alpha: 0.4,
        src: Utils.asset("images/logo-large.png"),
      },
      Text: {
        x: 960,
        y: 800,
        mount: 0.5,
        color: 0xffcebf35,
        text: {
          text: "[ press enter to continue ]",
        },
      },
    };
  }

  _init() {}

  _handleEnter() {
    Router.navigate("Home");
  }
}
