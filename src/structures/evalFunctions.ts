export const functions = [
  `function getRedirectEncodeLink (link) {
       return \`http%3A%2F%2F\${link.split(/https?:\\/\\//i)[1]}%2Fvalidate\`
     }`,
  `function getFullLink (link) {
       const redirect_uri = \`http%3A%2F%2F\${link.split(/https?:\\/\\//i)[1]}%2Fvalidate\`
       return \`https://discord.com/api/oauth2/authorize?client_id=770574530694610956&redirect_uri=\${redirect_uri}&response_type=code&scope=identify%20email%20guilds%20guilds.join\`
     }`,
];
