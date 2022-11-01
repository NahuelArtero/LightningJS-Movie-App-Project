import { Lightning, Utils, Router } from "@lightningjs/sdk";
import { Menu } from "./menu/Menu";
import { default as routes } from "./lib/Routes";

export default class App extends Router.App {
  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }

  static _template() {
    return {
      ...super._template(),
      Background: {
        w: 1920,
        h: 1080,
        alpha: 0.5,
        src: Utils.asset("images/Smoke.png"),
      },
      Widgets: {
        Menu: {
          type: Menu,
        },
      },
    };
  }

  _init() {
    this.tag("Background")
      .animation({
        duration: 10,
        repeat: -1,
        actions: [
          {
            t: "",
            p: "color",
            v: {
              0: { v: 0xffca6ad6 },
              0.5: { v: 0xffaf90b4 },
              0.8: { v: 0xffbe2bd1 },
            },
          },
        ],
      })
      .start();
  }

  _setup() {
    Router.startRouter(routes, this);
  }
}
