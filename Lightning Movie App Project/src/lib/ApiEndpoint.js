const apiBase = "https://api.themoviedb.org/3";
const apiKey = "6a14d23246055d83ff2601d0d3a62da3";

export const getMovie = async () => {
  let data = await fetch(
    apiBase + "/movie/top_rated?api_key=" + apiKey + "&language=en-US&page=1"
  );
  return data.json();
};

export const getSimilarMovies = async (movieID) => {
  let result = await fetch(
    apiBase +
      "/movie/" +
      movieID +
      "/similar?api_key=" +
      apiKey +
      "&language=en-US&page=1"
  );
  return result.json();
};

// export const getSerie = async () => {
//   let data = await fetch(
//     apiBase + "/tv/popular?api_key=" + apiKey + "&language=en-US&page=1"
//   );
//   return data.json();
// };
