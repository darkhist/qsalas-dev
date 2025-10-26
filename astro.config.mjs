// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: ["400", "500", "600", "700"],
        featureSettings: "'zero', 'ss01'",
        fallbacks: ["sans-serif"],
        subsets: ["latin"],
      },
    ],
  },
});
