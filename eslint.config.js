import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist/**"] },
  ...pluginVue.configs["flat/essential"],
  prettier,
];
