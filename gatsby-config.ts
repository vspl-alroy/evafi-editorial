import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: { sassOptions: { api: "modern-compiler" } },
    },
  ],
};

export default config;
