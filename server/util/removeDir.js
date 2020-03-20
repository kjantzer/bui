const fs = require('fs')
const path = require('path')

// https://stackoverflow.com/a/32197381/484780
module.exports = function(_path) {
  if (fs.existsSync(_path)) {
    fs.readdirSync(_path).forEach((file, index) => {
      const curPath = path.join(_path, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        removeDir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(_path);
  }
};