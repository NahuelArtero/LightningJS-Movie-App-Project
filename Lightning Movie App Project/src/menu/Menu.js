import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { MenuItem } from "./MenuItem";

export class Menu extends Lightning.Component {
  static _template() {
    return {
      x: -500,
      transitions: {
        x: {
          duration: 0.5,
          timingFunction: "cubic-bezier(0.17, 0.9, 0.32, 1.3)",
        },
      },
      Background: {
        rect: true,
        w: 400,
        h: 1080,
        color: 0xff853d8c,
        src: Utils.asset("images/backgroundMenu.png"),
      },
      MenuItems: {
        x: 150,
        y: 540,
        mounty: 0.5,
        flex: {
          direction: "column",
        },
        Item1: {
          type: MenuItem,
          pageName: "Movies",
        },
        Item2: {
          type: MenuItem,
          pageName: "Series",
        },
      },
    };
  }

  _init() {
    this.index = 0;
  }

  _focus() {
    this.patch({
      smooth: {
        x: -100,
        alpha: 1,
      },
      MenuLogo: {
        x: 150,
        y: 75,
        w: 200,
        h: 15,
        color: 0xffffffff,
        src: Utils.asset("images/logo.png"),
      },
      MenuItems: {
        text: {
          color: 0xffcebf35,
        },
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: {
        x: -500,
      },
    });
  }

  _handleUp() {
    if (this.index > 0) {
      this.index--;
    }
  }

  _handleDown() {
    if (this.index < this.tag("MenuItems").children.length - 1) {
      this.index++;
    }
  }

  getActiveItem() {
    return this.tag("MenuItems").children[this.index];
  }

  _handleEnter() {
    Router.focusPage();
    Router.navigate(this.getActiveItem().pageName);
  }

  _getFocused() {
    return this.getActiveItem();
  }
}
