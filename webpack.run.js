var optimist = require("optimist")
  .usage("Usage: $0")

  .alias("h", "help")
  .describe("h", "This help")

  .alias("p", "production")
  .default("p", false)
  .describe("p", "Enable minification and console cutter")

  .alias("w", "watch")
  .default("w", false)
  .describe("w", "Start watching source")

  .alias("t", "test")
  .default("t", false)
  .describe("t", "run build for test");

var argv = optimist.argv;
if (argv.h) {
  console.log(optimist.help());
  return;
}

var webpack = require("webpack");

var production = argv.p;
var watch = argv.w;
var test = argv.t;

if (production) {
  process.env.NODE_ENV = "production";
} else if (test) {
  process.env.NODE_ENV = "test";
} else {
  process.env.NODE_ENV = "development";
}
var config = require("./webpack.config");

var compiler = webpack(config);

var outputOptions = {
  colors: true,

  json: false,
  cached: false,
  cachedAssets: false,

  modules: true,
  chunkModules: false,
  chunks: false
};

var lastHash = null;
var callback = function(err, stats) {
  if (!watch) {
    compiler.purgeInputFileSystem();
  }
  if (err) {
    lastHash = null;
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    if (!watch || !test) {
      process.on("exit", function () {
        process.exit(1);
      });
    }
    return;
  }
  if (stats.hash !== lastHash) {
    lastHash = stats.hash;
    console.log(stats.toString(outputOptions) + "\n");
  }
};

if (watch || test) {
  compiler.watch({
    aggregateTimeout: 300,
    poll: true
  }, callback);

  return;
}

compiler.run(callback);

