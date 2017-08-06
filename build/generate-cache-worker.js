fs = require('fs')

const GenerateCacheFile = {
  FILES: [
  ],
  init: function() {
    fs.readFile('dist/index.html', 'utf8', this.onHTML.bind(this));
  },
  onHTML: function(err, data) {
    if (err) {
      return console.log(err);
    }
    this.getLinkTags(data);
    this.getJSTags(data);
    fs.readFile('cache.js', 'utf8', this.onCache.bind(this));
  },
  onCache: function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = this.updateCache(data);
    fs.writeFile('dist/cache.js', data, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
    this.copyManifest();
  },
  copyManifest: function(){
    fs.createReadStream('manifest.json').pipe(fs.createWriteStream('dist/manifest.json'));
  },
  updateCache: function(data) {
    var match = data.match(/FILES:(.*?[\S\s]+)\]/)[0];
    var content = match.split('[')[1];
    content =  match.split('[')[0] + '[' +  this.convertFilesToString() + content; 
    //data = data.replace(/FILES:(.*?[\S\s]+)\]/, 'FILES:[' + this.convertFilesToString() + ']');
    data = data.replace(match, content);
    return data;
  },
  convertFilesToString: function() {
    var string = "";
    this.FILES.forEach((item) => {
      string += "'" + item + "',\n";
    });
    return string;
  },
  getLinkTags: function(html) {
    var matches = [];
    matches = html.match(/<link.*?href=([^>\s]+)/g);
    matches.forEach((match, index, arr) => {
      arr[index] = match.split('href=')[1].replace(/"/g, '');
    });
    this.FILES = this.FILES.concat(matches);
  },
  getJSTags: function(html) {
    var matches = [];
    matches = html.match(/<script.*?src=([^>\s]+)/g);
    matches.forEach((match, index, arr) => {
      arr[index] = match.split('src=')[1].replace(/"/g, '');
    });
    this.FILES = this.FILES.concat(matches);
  }
}
GenerateCacheFile.init();
