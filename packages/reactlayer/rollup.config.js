const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
const typescript = require("rollup-plugin-typescript2");

export default {
  input: "lib/index.ts",
  output: [
    {
      file: "dist/reactlayer.js",
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
      file: "dist/reactlayer.es.js",
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
