import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"

const shared = {
  input: "src/index.js",
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules",
      },
    }),
    babel({
      exclude: "node_modules/**",
    }),
  ],
}

const config = [
  ({ ...shared,
    ...{
      output: {
        file: "dist/tracker.cjs.js",
        format: "cjs",
      },
    } }),
  ({ ...shared,
    ...{
      output: {
        file: "dist/tracker.es.js",
        format: "es",
      },
    } }),
  ({ ...shared,
    ...{
      output: {
        file: "dist/tracker.iife.js",
        format: "iife",
        name: "Tracker",
      },
    } }),
]

export default config
