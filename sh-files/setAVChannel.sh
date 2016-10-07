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


myurl="http://$server_ip:$server_port/goform/ReadWrite?redirect=lights%2Fbrightness.asp&variable=Remote:devices%5B$light_id%5D.Volume&value="$light_value"&read=Read"
resp=$(curl  -s "$myurl" | grep -oh "\w*val=\w*"  | head -1l | cut -c5-)
if [ $? -gt 0 ]; then
echo curl error
else

Volume=$resp
fi



Channel=$2


myurl="http://$server_ip:$server_port/goform/ReadWrite?redirect=lights%2Fbrightness.asp&variable=Remote:devices%5B$light_id%5D.Input&value="$light_value"&read=Read"
resp=$(curl  -s "$myurl" | grep -oh "\w*val=\w*"  | head -1l | cut -c5-)
if [ $? -gt 0 ]; then
echo curl error
else

Input=$resp
fi

myurl="http://$server_ip:$server_port/goform/ReadWrite?redirect=lights%2Fbrightness.asp&variable=Remote:activities%5B0%5D.Device%5B$light_id%5D.Power&value=$light_value&variable1=Remote:activities%5B0%5D.Device%5B$light_id%5D.Part_of_activity&value1=1&variable2=Remote:activities%5B0%5D.Device%5B$light_id%5D.Volume&value2=$Volume&variable3=Remote:activities%5B0%5D.Device%5B$light_id%5D.Channel&value3=$Channel&variable4=Remote:activities%5B0%5D.Device%5B$light_id%5D.Input&value4=$Input&variable5=Remote:remote_activity&value5=1&write=Write"
          curl -s "$myurl"
          if [ $? -gt 0 ]; then
            echo curl error
	   else

echo "$resp": result

fi
#fi
#fi
#task:lVariable   Remote:devices[0].Power