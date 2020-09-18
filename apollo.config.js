module.exports = {
    client: {
      excludes: ['src/generated/*'], // ignore the generated files
      service: {
        name: "flotte_project",
        url: "http://localhost:4000/graphql"
      }
    }
  };