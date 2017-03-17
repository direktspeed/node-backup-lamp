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
