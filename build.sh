#! /bin/sh
npm run build
expect -c "
    scp -r  /Users/jon/Desktop/finalProject-Front-end/dist/* root@34.96.178.185:/var/www/html
    expect {
        \"*assword\" {set timeout 20; send \"Apr.26th\r\"; exp_continue;} #此处的jello为密码，自行替换
    }
expect eof"
