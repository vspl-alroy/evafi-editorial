import type { GatsbyConfig } from "gatsby";

// Project Pages site lives under /<repo>/. The deploy workflow sets PATH_PREFIX and PREFIX_PATHS=true.
const config: GatsbyConfig = {
  pathPrefix: process.env.PATH_PREFIX,
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: { sassOptions: { api: "modern-compiler" } },
    },
  ],
};

export default config;
