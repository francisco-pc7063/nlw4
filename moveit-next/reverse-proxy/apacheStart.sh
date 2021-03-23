#!/bin/bash

SERVER_NAME=`ifconfig | egrep -w --color=auto "inet [[:digit:]]*" | cut -d " " -f10 | head -n1`
export $SERVER_NAME

echo "ServerName $SERVER_NAME" > /etc/apache2/conf-available/servername.conf

/usr/sbin/apachectl -D FOREGROUND
