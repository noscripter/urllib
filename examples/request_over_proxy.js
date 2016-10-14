'use strict';

var urllib = require('../');

var url = process.argv[2] || 'http://registry.npm.taobao.org';
console.log('timing: %s', url);

var count = 10;

function request(index) {
  if (index === count) {
    return;
  }
  urllib.request(url, {
    data: { wd: 'nodejs' },
    timing: true,
    proxy: 'http://localhost:8008'
  }, function (err, data, res) {
    if (err) {
      console.log(err);
    }
    console.log('---------------------------');
    console.log('No#%d: %s, keepalive: %s, content size: %d, headers: %j',
      index, res.statusCode, res.keepAliveSocket, data && data.length, res.headers);
    console.log(res.timing);
    index++;
    setImmediate(request.bind(null, index));
  });
}

request(0);
