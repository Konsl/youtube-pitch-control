const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const entries = ['content', 'background', 'popup'];

const ignorePatterns = [
  "**/manifest-**",
  "**/src/**",
  "**/icon.svg",
  ...entries.map(entry => `**/${entry}.js`)
];

module.exports = {
  entry: Object.fromEntries(entries.map(entry => [entry, path.join(__dirname, './extension/', `${entry}.js`)])),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: false,
  },
  watchOptions: {
    ignored: "**/dist/**",
  },
  plugins: [
    // exclude locale files in moment
    new CopyPlugin({
      patterns: [
        {
          from: "./extension",
          to: "./chrome",
          globOptions: {
            ignore: ignorePatterns,
          },
        },
        {
          from: "./extension/manifest-chrome.json",
          to: "./chrome/manifest.json",
        },
        {
          from: "./extension",
          to: "./firefox",
          globOptions: {
            ignore: ignorePatterns,
          },
        },
        {
          from: "./extension/manifest-firefox.json",
          to: "./firefox/manifest.json",
        },
      ],
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: "./dist/**.js",
              destination:
                "./dist/firefox/",
            },
            {
              source: "./dist/**.js",
              destination:
                "./dist/chrome/",
            },
          ],
        },
      },
    }),
  ],
};
