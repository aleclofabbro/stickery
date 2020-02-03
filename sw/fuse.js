const { FuseBox, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const isProduction = process.env.NODE_ENV !== 'development'
const fuse = FuseBox.init({
    homeDir: ".",
    target: "browser@es6",
    output: "../public/sw.js",
    plugins: [WebIndexPlugin(), isProduction && QuantumPlugin()],
});
fuse
    .bundle("sw.js")
    .instructions(" > sw.ts")
    .watch();

fuse.run();