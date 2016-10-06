#!/bin/bash
server_ip=192.168.2.250
server_port=80

jal_value=$1
shift
while [ $# -gt 0 ]
do
   jal_id=$1
   shift
   if [ $jal_id -gt 0 ]; then
	if [ $jal_id -le 300 ]; then
	     if [ $jal_value -ge 0 ]; then
		  if [ $jal_value -le 100 ]; then
			myurl="http://$server_ip:$server_port/goform/ReadWrite?redirect=lights%2Fbrightness.asp&variable=Blinds%5B$jal_id%5D.set_Position&value=255&variable1=Blinds%5B$jal_id%5D.set_Angle&value1=$jal_value&variable2=Blinds%5B$jal_id%5D.set&value2=1&write=Write"
			curl  -s "$myurl" | grep -oh "\w*val=\w*"  | head -1l | cut -c5-
			if [ $? -gt 0 ]; then
				echo curl error
			fi
		   fi
	      fi
		
         fi
     fi
done	