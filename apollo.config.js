module.exports = {
    client: {
      excludes: ['src/generated/*'], // ignore the generated files
      service: {
        name: "flotte_project",
        url: "https://flotte.duckdns.org/graphqldev"
      }
    }
  };