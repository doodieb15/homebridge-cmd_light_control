light_id=$1
light_value=$2
server_ip=192.168.2.250
server_port=80
#echo $light_id
#echo $light_value
if [ $light_id -ge 0 ]; then
if [ $light_id -le 25 ]; then
#echo $light_id
#echo $light_value
#echo $server_ip : $server_port
myurl="http://$server_ip:$server_port/goform/ReadWrite?redirect=lights%2Fbrightness.asp&variable=Zimmer%5B$light_id%5D.Klima.CO2&value="$light_value"000&read=Read"

if [ $? -gt 0 ]; then
	echo curl error
else

#curl "$myurl"
resp=$(curl  -s "$myurl" | sed -e "s/%2e/\./g"   | grep -oP "\w*val=\w[ ]" ) #  | head -1l | cut -c5-) # | sed -i -e 's/%2e/\./g'
resp1=$(curl -s "$myurl" | sed -e "s/%2e/\./g")

#echo $resp1
resp2=${resp1% &*}
#echo $resp2

resp=${resp2##*val=}

echo $resp

fi
fi
fi
