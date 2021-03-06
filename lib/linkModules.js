var fs = require('fs');
var mkdirp = require('mkdirp');

function linkModules(toDir, dirName) {
  mkdirp.sync(toDir);
  copyWebpackModules(toDir);
}

function copyWebpackModules(toDir) {
  var fromDir = __dirname + '/..';
  var modules = require(fromDir + '/package.json').dependencies;

  Object.keys(modules).forEach(function(packageName) {
    var srcModule = fromDir + '/node_modules/' + packageName;
    var destModule = toDir + '/' + packageName;

    // console.log(srcModule, "\n", destModule, "\n", fs.existsSync(destModule))

    if (!fs.existsSync(srcModule)) {
      console.log('Error! Make sure you have run npm install in reapp-pack');
    }
    else {
      if (!fs.existsSync(destModule)) {
        try {
          fs.symlinkSync(srcModule, destModule, 'dir');
        }
        catch (e) {
          console.log('Error', e);
          console.log("This may be because your server_modules isn't linked properly, try wiping ./server_modules and running again.");
        }
      }
    }
  });
}

module.exports = linkModules;