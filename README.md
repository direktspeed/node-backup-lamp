# node-backup
Small backup util that backups
from /etc:
- apache2 config
- php5 config
from /var/www/:
- *
executes:
-  mysqlCmd and stores that as sql.gz

gets configured via config.js



## Usage


Install
```
# As Root
apt-get install npm
npm install -g n
n latest
mkdir -p ~/.backup-config
cp /usr/local/lib/node_modules/node-backup-lamp/config.example.js ~/.backup-config
# Edit and Adjust your config read the create config section or copy existing to ~/.backup-config
```

Backup
```
node-backup
```

Restore
```
node-backup-restore
```

## Create Config
Edit ``` ~/.backup-config/config.js ```
```
var date = new Date().toISOString();
module.exports = {
  sftp: {
    host: 'hostname.xxx.tld',
    port: '22',
    username: 'user',
    password: 'pass'
  },
  sftpPath: '/backups/'+date+'/',
  mysqlCmd: 'mysqldump -u USER -pPASSWORD -h HOST DB | gzip -f && exit 0'
};
```
