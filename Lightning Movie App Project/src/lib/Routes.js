import { Home } from "../pages/Home";
import { Movie } from "../pages/Movie";
import { BootPage } from "../pages/BootPage";

export default {
  routes: [
    {
      path: "$",
      component: BootPage,
      widgets: ["Menu"],
    },
    {
      path: "Home",
      component: Home,
      widgets: ["Menu"],
    },
    {
      path: "Movie",
      component: Movie,
    },
  ],
};
