#!/bin/bash
light_id=$1
light_value=$2
server_ip=192.168.2.250
server_port=80
#echo "light_ID: "$light_id
#echo $light_value
#if [ $light_id -gt 0 ]; then
#if [ $light_id -le 300 ]; then
#echo $light_id
#echo $light_value
#echo $server_ip : $server_port
myurl="http://$server_ip:$server_port/goform/ReadWrite?redirect=lights%2Fbrightness.asp&variable=Blinds%5B$light_id%5D.Running&value=0&read=Read"
#echo $myurl
resp=$(curl  -s "$myurl" | grep -oh "\w*val=\w*"  | head -1l | cut -c5-)
#echo $resp
if [ $? -gt 0 ]; then
echo curl error
else
resp1=`expr $resp ` 
echo "$resp1": result
fi
#fi
#fi
