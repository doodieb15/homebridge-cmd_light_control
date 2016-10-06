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
myurl="http://$server_ip:$server_port/goform/ReadWrite?redirect=lights%2Fbrightness.asp&variable=Remote:devices%5B$light_id%5D.Power&value="$light_value"&read=Read"
resp=$(curl  -s "$myurl" | grep -oh "\w*val=\w*"  | head -1l | cut -c5-)
if [ $? -gt 0 ]; then
echo curl error
else

echo "$resp": result
fi
#fi
#fi
#task:lVariable   Remote:devices[0].Power