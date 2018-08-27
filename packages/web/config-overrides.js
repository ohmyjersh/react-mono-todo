const rewireYarnWorkspaces = require('react-app-rewire-yarn-workspaces');

module.exports = function override(config, env) {
  return rewireYarnWorkspaces(config, env);
};

// const fs = require("fs");
// const path = require("path");
// const rewireBabelLoader = require("react-app-rewire-babel-loader");

// const appDirectory = fs.realpathSync(process.cwd());
// const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// module.exports = function override(config, env) {
//   return rewireBabelLoader.include(config, resolveApp("../shared"));
// };

