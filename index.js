var inherits = require('util').inherits;
var Service, Characteristic;
var exec = require("child_process").exec;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    makeVolumeCharacteristic();
    makeChannelCharacteristic();
    homebridge.registerAccessory("homebridge-cmd", "CMD", CmdAccessory);
}


function CmdAccessory(log, config) {
    this.log = log;

    // url info
    this.on_cmd = config["on_cmd"];
    this.off_cmd = config["off_cmd"];
    this.getStatus_cmd = config["get_status_cmd"]
    this.brightness_cmd = config["brightness_cmd"];
    this.name = config["name"];
    this.service = config["service"] || "Switch";
    this.brightnessHandling = config["brightnessHandling"] || "no";
    this.getTemperature_cmd = config["get_temperature_cmd"];
    this.getCO2_cmd = config["getCO2_cmd"];
    this.getHumidity_cmd = config["getHumidity_cmd"];
    this.getBlindsPosition_cmd = config["getBlindsPosition_cmd"];
    this.setBlindsPosition_cmd = config["setBlindsPosition_cmd"];
    this.getBlindsState_cmd = config["getBlindsState_cmd"];
    this.setBlindsHorizontalTiltAngle_cmd = config["setBlindsHorizontalTiltAngle_cmd"];
    this.getBlindsHorizontalTiltAngle_cmd = config["getBlindsHorizontalTiltAngle_cmd"];
    this.setAVOn_cmd = config["setAVon_cmd"];
    this.getAVOn_cmd = config["getAVon_cmd"];    
    this.setAVVolume_cmd = config["setAVVolume_cmd"];
    this.getAVVolume_cmd = config["getAVVolume_cmd"];
    this.setAVChannel_cmd = config["setAVChannel_cmd"];    
    this.getAVChannel_cmd = config["getAVChannel_cmd"];}






CmdAccessory.prototype = {

    cmdRequest: function (cmd, callback) {

        exec(cmd, function (error, stdout, stderr) {
            callback(error, stdout, stderr)
        })
    },

    setPowerState: function (powerOn, callback) {
        var cmd;

        if (powerOn) {
            cmd = this.on_cmd;
            this.log("Setting power state to on");
        } else {
            cmd = this.off_cmd;
            this.log("Setting power state to off");
        }

        this.cmdRequest(cmd, function (error, stdout, stderr) {
            if (error) {
                this.log('power function failed: %s', stderr);
                callback(error);
            } else {
                this.log('power function succeeded!');
                callback();
                this.log(stdout);
            }
        }.bind(this));
    },

    getPowerState: function (callback) {
        if (!this.getStatus_cmd) {
            this.log.warn("Ignoring request; No status cmd defined.");
            callback(new Error("No status cmd defined."));
            return;
        }

        this.log("Getting power state");

        cmd = this.getStatus_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get power function failed: %s', error.message);
                callback(error);
            } else {
                var binaryState = parseFloat(response);
                var powerOn = binaryState > 0;
                this.log("Power state is currently %s", powerOn);
                callback(null, powerOn);
            }

        }.bind(this));
    },
    getBrightness: function (callback) {
        if (!this.getStatus_cmd) {
            this.log.warn("Ignoring request; No status cmd defined.");
            callback(new Error("No status cmd defined."));
            return;
        }

        this.log("Getting brightness level");


        cmd = this.getStatus_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get brightness function failed: %s', error.message);
                callback(error);
            } else {
                this.log('Brightness level is currently %s', parseFloat(response));
                callback(null, parseFloat(response));
            }

        }.bind(this));
    },

    setAVOn: function (powerOn, callback) {
        var cmd;


	var cmd = this.setAVOn_cmd.replace("%b", powerOn)	

        this.cmdRequest(cmd, function (error, stdout, stderr) {
            if (error) {
                this.log('power function failed: %s', stderr);
                callback(error);
            } else {
                this.log('power function succeeded!');
                callback();
                this.log(stdout);
            }
        }.bind(this));
    },

    getAVOn: function (callback) {
        if (!this.getAVOn_cmd) {
            this.log.warn("Ignoring request; No status cmd defined.");
            callback(new Error("No status cmd defined."));
            return;
        }

        this.log("Getting power state");
	

        cmd = this.getAVOn_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get power function failed: %s', error.message);
                callback(error);
            } else {
                var binaryState = parseFloat(response);
                var powerOn = binaryState > 0;
                this.log("Power state is currently %s", powerOn);
                callback(null, powerOn);
            }

        }.bind(this));
    },


    setAVVolume: function (powerOn, callback) {
        var cmd;

	var cmd = this.setAVVolume_cmd.replace("%b", powerOn)

        this.cmdRequest(cmd, function (error, stdout, stderr) {
            if (error) {
                this.log('Volume function failed: %s', stderr);
                callback(error);
            } else {
                this.log('Volume function succeeded!');
                callback();
                this.log(stdout);
            }
        }.bind(this));
    },
    getAVVolume: function (callback) {
        if (!this.getAVVolume_cmd) {
            this.log.warn("Ignoring request; No status cmd defined.");
            callback(new Error("No status cmd defined."));
            return;
        }

        this.log("Getting Volume state");

        cmd = this.getAVVolume_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get Volume function failed: %s', error.message);
                callback(error);
            } else {
                var powerOn = parseFloat(response);
                this.log("AVVolume is currently %s", powerOn);
                callback(null, powerOn);
            }

        }.bind(this));
    },
    setAVChannel: function (powerOn, callback) {
        var cmd;

	var cmd = this.setAVChannel_cmd.replace("%b", powerOn)

        this.cmdRequest(cmd, function (error, stdout, stderr) {
            if (error) {
                this.log('power function failed: %s', stderr);
                callback(error);
            } else {
                this.log('Channel function succeeded!');
                callback();
                this.log(stdout);
            }
        }.bind(this));
    },
    getAVChannel: function (callback) {
        if (!this.getAVChannel_cmd) {
            this.log.warn("Ignoring request; No status cmd defined.");
            callback(new Error("No status cmd defined."));
            return;
        }

        this.log("Getting Channel state");

        cmd = this.getAVChannel_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get Channel function failed: %s', error.message);
                callback(error);
            } else {
                var powerOn = parseFloat(response);
                this.log("AVChannel is currently %s", powerOn);
                callback(null, powerOn);
            }

        }.bind(this));
    },
    getTemperature: function (callback) {
        if (!this.getTemperature_cmd) {
            this.log.warn("Ignoring request; No Get Temperature cmd defined.");
            callback(new Error("No get Temperature cmd defined."));
            return;
        }

        this.log("Getting Temperature level");


        cmd = this.getTemperature_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get Temperature function failed: %s', error.message);
                callback(error);
            } else {
                this.log("Temperature level is currently %s", parseFloat(response));
                callback(null, parseFloat(response));
            }

        }.bind(this));
    },



    getCarbonDioxideLevel: function (callback) {
        if (!this.getCO2_cmd) {
            this.log.warn("Ignoring request; No Get CO2 cmd defined.");
            callback(new Error("No get CO2 cmd defined."));
            return;
        }

        this.log("Getting CO2 level");


        cmd = this.getCO2_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get CO2 function failed: %s', error.message);
                callback(error);
            } else {
                this.log("CO2 level is currently %s", parseFloat(response));
                callback(null, parseFloat(response));
            }

        }.bind(this));
    },

    getHumidityLevel: function (callback) {
        if (!this.getHumidity_cmd) {
            this.log.warn("Ignoring request; No Get Humidiy cmd defined.");
            callback(new Error("No get Humidity cmd defined."));
            return;
        }

        this.log("Getting Humidity level");


        cmd = this.getHumidity_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get Humidity function failed: %s', error.message);
                callback(error);
            } else {
                this.log("Humidity level is currently %s", parseFloat(response));
                callback(null, parseFloat(response));
            }

        }.bind(this));
    },

    setBrightness: function (level, callback) {

        if (level < 20) {
            level = 0;
        }
        var cmd = this.brightness_cmd.replace("%b", level)
        if (!this.getStatus_cmd) {
            this.log.warn("Ignoring request; No status cmd defined.");
            callback(new Error("No status cmd defined."));
            return;
        }

        this.log("Setting brightness to %s", level);

        this.cmdRequest(cmd, function (error, stdout, stderr) {
            if (error) {
                this.log('CMD set brightness function failed: %s', error);
                callback(error);
                return;
            } else {
                this.log('CMD Set brightness function succeeded!');
                //callback();  
            }
        }.bind(this));



        this.log("Getting brightness level");


        cmd = this.getStatus_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get brightness function failed: %s', error.message);
                callback(error);
		return;
            } else {
                this.log('Brightness level is currently %s', parseFloat(response));
                callback(null, parseFloat(response));
            }

        }.bind(this));
    },
    getBlindsCurrentPosition: function (callback) {
        if (!this.getBlindsPosition_cmd) {
            this.log.warn("Ignoring request; No Get Blinds cmd defined.");
            callback(new Error("No get Blinds cmd defined."));
            return;
        }

        this.log("Getting Blinds Position");


        cmd = this.getBlindsPosition_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get BlindsPosition function failed: %s', error.message);
                callback(error);
            } else {
                this.log("BlindsPosition is currently %s", parseInt(response));
                callback(null, parseInt(response));
            }

        }.bind(this));
    },

    setBlindsCurrentPosition: function (level, callback) {



        var cmd = this.setBlindsPosition_cmd.replace("%b", level)

        if (!this.setBlindsPosition_cmd) {
            this.log.warn("Ignoring request; No Set Blinds cmd defined.");
            callback(new Error("No Set Blinds cmd defined."));
            return;
        }

        this.log("Setting Blinds Position");
        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD set BlindsPosition function failed: %s', error.message);
                callback(error);
            } else {
                this.log("BlindsPositioncmd function succeeded!");
              	callback();
            }

        }.bind(this));
    },

    getPositionState: function (callback) {
        if (!this.getBlindsState_cmd) {
            this.log.warn("Ignoring request; No Set BlindsState cmd defined.");
            callback(new Error("No Set BlindsState cmd defined."));
            return;
        }

        this.log("Getting Blinds State");


        cmd = this.getBlindsState_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD set BlindsState function failed: %s', error.message);
                callback(error);
            } else {
                this.log("BlindsState is %s", parseInt(response));
                callback(null, parseInt(response));
            }

        }.bind(this));
    },

    getBlindsHorizontalTiltAngle: function (callback) {
        if (!this.getBlindsHorizontalTiltAngle_cmd) {
            this.log.warn("Ignoring request; No Get BlindsHorizontalTiltAngle cmd defined.");
            callback(new Error("No Get BlindsHorizonalTiltAngle cmd defined."));
            return;
        }

        this.log("Getting Blinds Horziontal Angle State");


        cmd = this.getBlindsHorizontalTiltAngle_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD get BlindsHorizontalAngle function failed: %s', error.message);
                callback(error);
            } else {
                this.log("BlindsHorizontalAngel is %s", parseInt(response));
                callback(null, parseInt(response));
            }

        }.bind(this));
    },

    setBlindsHorizontalTiltAngle: function (level, callback) {



        var cmd = this.setBlindsHorizontalTiltAngle_cmd.replace("%b", level)

        if (!this.setBlindsHorizontalTiltAngle_cmd) {
            this.log.warn("Ignoring request; No Set BlindsHorizontalTiltAngle cmd defined.");
            callback(new Error("No Set BlindsHorizonalTiltAngle cmd defined."));
            return;
        }

        this.log("Setting Blinds Horziontal Angle State");

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD set BlindsHorizontalAngle function failed: %s', error.message);
                callback(error);
            } else {
                this.log("BlindsHorizontalAngelcmd function succeeded");
                callback();
            }

        }.bind(this));
    }, 


    identify: function (callback) {
        this.log("Identify requested!");
        callback(); // success
    },

    getServices: function () {

        // you can OPTIONALLY create an information service if you wish to override
        // the default values for things like serial number, model, etc.
        var informationService = new Service.AccessoryInformation();

        informationService
            .setCharacteristic(Characteristic.Manufacturer, "cmd Manufacturer")
            .setCharacteristic(Characteristic.Model, "cmd Model")
            .setCharacteristic(Characteristic.SerialNumber, "cmd Serial Number");

        //		var switchService = new Service.Switch(this.name);

        //		switchService
        //			.getCharacteristic(Characteristic.On)
        //			.on('set', this.setPowerState.bind(this));

        //		return [switchService];



        switch (this.service) {
            case "Switch":
                this.switchService = new Service.Switch(this.name);
                this.switchService
                    .getCharacteristic(Characteristic.On)
                    .on('set', this.setPowerState.bind(this))
                    .on('get', this.getPowerState.bind(this));
                return [this.switchService];
                break;
            case "Light":
                this.lightbulbService = new Service.Lightbulb(this.name);
                this.lightbulbService
                    .getCharacteristic(Characteristic.On)
                    .on('set', this.setPowerState.bind(this))
                    .on('get', this.getPowerState.bind(this));
                if (this.brightnessHandling == "yes") {
                    this.lightbulbService
                        .addCharacteristic(new Characteristic.Brightness())
                        .on('set', this.setBrightness.bind(this))
                        .on('get', this.getBrightness.bind(this));
                }

                return [informationService, this.lightbulbService];
                break;
            case "TemperaturSensor":
                this.TempSensorservice = new Service.TemperatureSensor(this.name);
                this.TempSensorservice
                    .getCharacteristic(Characteristic.CurrentTemperature)
			.setProps( {
   				 maxValue: 60,
    				 minValue: -30})
                    .on('get', this.getTemperature.bind(this));
                return [this.TempSensorservice];
                break;
	    case "AV":
                this.AVservice = new Service.Switch(this.name);
  		this.AVservice
  			.getCharacteristic(Characteristic.On)
    				.on("set", this.setAVOn.bind(this))
    				.on("get", this.getAVOn.bind(this));

 		 this.AVservice
   			 .addCharacteristic(VolumeCharacteristic)
    			 	.on('get', this.getAVVolume.bind(this))
   			        .on('set', this.setAVVolume.bind(this));
	
 		 this.AVservice
    			.addCharacteristic(ChannelCharacteristic)
    				.on('get', this.getAVChannel.bind(this))
    				.on('set', this.setAVChannel.bind(this));
		 return [this.AVservice];
		 break;
	    case "CarbonDioxide":
		this.CarbonDioxideservice = new Service.CarbonDioxideSensor(this.name);
		this.CarbonDioxideservice
                    .getCharacteristic(Characteristic.CarbonDioxideLevel)
                    .on('get', this.getCarbonDioxideLevel.bind(this));
                return [this.CarbonDioxideservice];
                break;
	    case "Humidity":
		this.Humidityservice = new Service.HumiditySensor(this.name);
		this.Humidityservice
                    .getCharacteristic(Characteristic.CurrentRelativeHumidity)
                    .on('get', this.getHumidityLevel.bind(this));
                return [this.Humidityservice];
                break;
	    case "Blinds":
		this.Blindservice = new Service.WindowCovering(this.name);
		this.Blindservice
		    .getCharacteristic(Characteristic.CurrentPosition)
			.setProps( {
				 unit: Characteristic.Units.PERCENTAGE,
   				 maxValue: 100,
    				 minValue: 0,
    				 minStep: 20})
		    .on('get' , this.getBlindsCurrentPosition.bind(this));
		this.Blindservice
		    .getCharacteristic(Characteristic.TargetPosition)
			.setProps( {
				 unit: Characteristic.Units.PERCENTAGE,
   				 maxValue: 100,
    				 minValue: 0,
    				 minStep: 20})
		    .on('set' , this.setBlindsCurrentPosition.bind(this));
		this.Blindservice
		    .getCharacteristic(Characteristic.PositionState)
			.setProps( {
   				 maxValue: 2,
    				 minValue: 0,
    				 minStep: 1})
		    .on('get' , this.getPositionState.bind(this));
		this.Blindservice
                        .getCharacteristic(new Characteristic.TargetHorizontalTiltAngle())
			.setProps( {
   				 maxValue: 100,
    				 minValue: 0,
    				 minStep: 25})
                        .on('set', this.setBlindsHorizontalTiltAngle.bind(this));
		this.Blindservice
                        .getCharacteristic(new Characteristic.CurrentHorizontalTiltAngle())
			.setProps( {
   				 maxValue: 100,
    				 minValue: 0,
    				 minStep: 25})
                        .on('get', this.getBlindsHorizontalTiltAngle.bind(this));


		
		return [informationService, this.Blindservice];
		break;

        }
    }
};

function makeVolumeCharacteristic() {

  VolumeCharacteristic = function() {
    Characteristic.call(this, 'Volume', '91288267-5678-49B2-8D22-F57BE995AA93');
    this.setProps({
      format: Characteristic.Formats.INT,
      unit: Characteristic.Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };

  inherits(VolumeCharacteristic, Characteristic);
}

function makeChannelCharacteristic() {

  ChannelCharacteristic = function () {
    Characteristic.call(this, 'Channel', '212131F4-2E14-4FF4-AE13-C97C3232499D');
    this.setProps({
      format: Characteristic.Formats.INT,
      unit: Characteristic.Units.NONE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };

  inherits(ChannelCharacteristic, Characteristic);
}