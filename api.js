const fetch = require("node-fetch");

function githubAPI(repositoryOwner, repositoryName, startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  fetch(`https://api.github.com/repos/${repositoryOwner}/${repositoryName}/pulls?state=all`)
    .then((response) => response.json())
    .then((data) => {
      let i = 0;
      for (info in data) {
        if (
          new Date(data[i].created_at) >= start &&
          new Date(data[i].created_at) <= end ||

          new Date(data[i].updated_at) >= start &&
          new Date(data[i].updated_at) <= end ||

          new Date(data[i].merged_at) >= start &&
          new Date(data[i].merged_at) <= end ||
          
          new Date(data[i].closed_at) >= start &&
          new Date(data[i].closed_at) <= end
        ) {
          console.log(`pull request created at ${data[i].created_at}`);
          console.log(`pull request updated at ${data[i].updated_at}`);
          console.log(`pull request merged at ${data[i].merged_at}`);
          console.log(`pull request closed at ${data[i].closed_at}`);
        }
        i++;
      }
    })
    .catch((error) => console.error(error));
}
githubAPI("COVIDShield", "mobile", "2020-07-15", "2020-10-15");