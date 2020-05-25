const axios = require('axios');

// GraphQL query for Github API (https://developer.github.com/v4/)
const query = `
  query {
    angular: repository(owner: "angular", name: "angular.js") {
      url
      stargazers {
        totalCount
      }
    }
    vue: repository(owner: "vuejs", name: "vue") {
      url
      stargazers {
        totalCount
      }
    }
  }
`;

module.exports = (ctx, cb) => {
  const github = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': `Bearer ${ctx.secrets.GITHUB_API_TOKEN}`
    }
  });

  github.post('graphql', { query }).then((response) => {
    cb(null, response.data);
  });
};
