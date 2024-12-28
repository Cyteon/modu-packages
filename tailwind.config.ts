import type { Config } from 'tailwindcss';
import catppuccin from "@catppuccin/tailwindcss";

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [
    catppuccin({
      prefix: "ctp",
      defaultFlavour: "mocha",
    })
  ]
} satisfies Config;
