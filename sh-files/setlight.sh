#!/bin/bash
server_ip=192.168.2.250
server_port=80
light_value=$1
shift
while [ $# -gt 0 ]
do
  light_id=$1
  shift
  if [ $light_id -gt 0 ]; then
    if [ $light_id -le 300 ]; then
      if [ $light_value -ge 0 ]; then
        if [ $light_value -le 100 ]; then
          myurl="http://$server_ip:$server_port/goform/ReadWrite?redirect=lights%2Fbrightness.asp&variable=V_soll%5B$light_id%5D&value="$light_value"000&write=Write"
          curl -s "$myurl"
          if [ $? -gt 0 ]; then
            echo curl error
          fi
        fi
      fi
    fi
  fi
done