const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
const typescript = require("rollup-plugin-typescript2");

export default {
  input: "lib/index.tsx",
  output: [
    {
      file: "dist/react-portal-manager.js",
      format: "umd",
      name: "ReactPortalManager",
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
      sourcemap: true,
    },
    {
      file: "dist/react-portal-manager.es.js",
      format: "es",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom", "p-defer"],
  plugins: [
    nodeResolve(),
    typescript(/*{ plugin options }*/),
    babel({
      babelrc: false,
      presets: [["@babel/preset-env", { modules: false }], "@babel/react"],
      plugins: ["@babel/proposal-class-properties"],
      exclude: "node_modules/**",
    }),
  ],
};
