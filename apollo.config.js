module.exports = {
    client: {
      excludes: ['src/generated/*'], // ignore the generated files
      service: {
        name: "flotte_project",
        url: "http://173.212.197.169:4000/graphql"
      }
    }
  };