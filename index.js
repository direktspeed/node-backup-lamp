//sftp.get('/backups/test-Fri Mar 17 2017 11:21:16 GMT+0100 (CET).tar.gz').then(x => x.pipe(fs.createWriteStream('compressed.tar.gz')));
// process.stdin.resume();
//return sftp.put(process.stdin,'/backups/test-'+date+'.tar.gz');
var fs = require('fs');
var targz = require('tar.gz')({
  level: 9, // Maximum compression
  memLevel: 9
});

let Client = require('ssh2-sftp-client');
let sftp = new Client();
//var config = process.cwd()+'/config';
var config = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']+'/.backup-config/config';
console.log(config);
config = require(config);
console.log(config);
// console.log(config);
sftp.connect(config.sftp).then(() =>sftp.mkdir(config.sftpPath)).then(() => {
  console.log(config.sftpPath);
}).then(() => {
  var Stream = require('child_process').execSync(config.mysqlCmd);
  return sftp.put(Stream, config.sftpPath+'mysql.sql.gz');
}).then(() => sftp.list(config.sftpPath)).then(data=> console.log(data.pop()))
.then(() => sftp.put(targz.createReadStream('/etc/apache2'), config.sftpPath+'apache2.tar.gz'))
.then(() => sftp.list(config.sftpPath)).then(data=> console.log(data.pop()))
.then(() => sftp.put(targz.createReadStream('/etc/php5'), config.sftpPath+'php5.tar.gz'))
.then(() => sftp.list(config.sftpPath)).then(data=> console.log(data.pop()))
.then(() => sftp.put(targz.createReadStream('/var/www'), config.sftpPath+'www.tar.gz'))
.then(() => sftp.list(config.sftpPath)).then(data=> console.log(data.pop()))
.then(() => process.exit(0))
.catch((err) => {
  console.log(err, 'catch error');
});
