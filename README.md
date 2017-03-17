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
//node-backup-restore
sftp user@hostname.tld
cd sftpPath/
ls
#find directory
get directory
exit
cd directory
for file in *.tar.gz; do tar -zxf $file; done && rm -f *.tar.gz \
&& mkdir -p /etc/apache2 /etc/php5 /var/www \
&& rm -rf /etc/apache2 /etc/php5 /var/www \
&& mv apache2 /etc \
&& mv php5 /etc \
&& mv www /var \
&& systemctl restart apache2

#import the mysql.sql.gz into your mysql server use the same that u used for mysqlCmd but run mysql instead like
#The database must exist you can create it via phpMyAdmin or the Install
mysql -u USER -pPASSWORD -h HOST DB < mysql.sql.gz
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
