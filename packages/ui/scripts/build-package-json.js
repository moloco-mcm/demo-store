const fs = require('fs');
const path = require('path');

const packagePath = path.resolve(__dirname, '../');
const distPath = path.resolve(__dirname, '../dist');

// build package.json file for distribution
function buildPackageJson() {
  const packageData = fs.readFileSync(
    path.resolve(packagePath, './package.json'),
    'utf8'
  );

  const { name, version, dependencies, peerDependencies, engines } =
    JSON.parse(packageData);

  const newPackageJson = {
    name,
    version,
    main: './index.js',
    engines,
    sideEffects: false, // ref: https://webpack.js.org/guides/tree-shaking/
    private: true,
    dependencies,
    peerDependencies,
  };

  fs.writeFileSync(
    path.resolve(distPath, './package.json'),
    JSON.stringify(newPackageJson, null, 2),
    'utf8'
  );
}

buildPackageJson();
