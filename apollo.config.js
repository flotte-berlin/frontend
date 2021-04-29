module.exports = {
    client: {
      excludes: ['src/generated/*'], // ignore the generated files
      service: {
        name: "flotte_project",
        url: "http://127.0.0.1:4000/graphql"
      }
    }
  };