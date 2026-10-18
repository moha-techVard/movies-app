document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("movie");
  const button = document.getElementById("submit");
  const results = document.getElementById("results");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const movieName = input.value;
    fletchmovie(movieName);
  });

  async function fletchmovie(movieName) {
    const apiKey = "5b23292e5ec83559e37c1cf9bcef1a93";
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}`;

    const Response = await fetch(apiUrl);
    const data = await Response.json();
    console.log(data);
    try {
      if (data.results.length > 0) {
        const search = data.results[0].id;
        const url = `https://api.themoviedb.org/3/movie/${search}?api_key=${apiKey}&append_to_response=videos,credits`;
        const Response1 = await fetch(url);
        const data1 = await Response1.json();
        console.log(data1);
        results.innerHTML = ` <h2><strong>name</strong>:${data1.title}</h2>
  <p><strong>overview</strong>:${data1.overview}</p>
  <h3><strong>release date</strong>:${data1.release_date}</h3>
  <h4> <strong>actors</strong> ${data1.credits.cast
    .slice(0, 5)
    .map((actor) => actor.name)
    .join("  ")}</h4>
  <img src="https://image.tmdb.org/t/p/w500/${data1.backdrop_path}" />
        `;
      } else {
        console.log("you need to put the right name ");
      }
    } catch (error) {
      console.error("Error fetching the movie details:", error);
      results.innerHTML =
        "<p>An error occurred while fetching the movie details.</p>";
    }
  }
});
