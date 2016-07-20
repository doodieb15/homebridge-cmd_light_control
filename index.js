var Service, Characteristic;
var exec = require("child_process").exec;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
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
    this.getBlindsPosition_cmd = config["getBlindsPosition_cmd"];
    this.setBlindsPosition_cmd = config["setBlindsPosition_cmd"];
    this.getBlindsState_cmd = config["getBlindsState_cmd"];
    this.setBlindsHorizontalTiltAngle_cmd = config["setBlindsHorizontalTiltAngle_cmd"];
    this.getBlindsHorizontalTiltAngle_cmd = config["getBlindsHorizontalTiltAngle_cmd"];
}






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
                this.log("BlindsPosition is currently %s", parseFloat(response));
                callback(null, parseFloat(response));
            }

        }.bind(this));
    },
    setBlindsCurrentPosition: function (callback) {
        if (!this.setBlindsPosition_cmd) {
            this.log.warn("Ignoring request; No Set Blinds cmd defined.");
            callback(new Error("No Set Blinds cmd defined."));
            return;
        }

        this.log("Setting Blinds Position");


        cmd = this.setBlindsPosition_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD set BlindsPosition function failed: %s', error.message);
                callback(error);
            } else {
                this.log("BlindsPosition is set to %s", parseFloat(response));
                callback(null, parseFloat(response));
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
                this.log("BlindsState is %s", parseFloat(response));
                callback(null, parseFloat(response));
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
                this.log("BlindsHorizontalAngele is %s", parseFloat(response));
                callback(null, parseFloat(response));
            }

        }.bind(this));
    },
    setBlindsHorizontalTiltAngle: function (callback) {
        if (!this.setBlindsHorizontalTiltAngle_cmd) {
            this.log.warn("Ignoring request; No Set BlindsHorizontalTiltAngle cmd defined.");
            callback(new Error("No Set BlindsHorizonalTiltAngle cmd defined."));
            return;
        }

        this.log("Setting Blinds Horziontal Angle State");


        cmd = this.setBlindsHorziontalState_cmd;

        this.cmdRequest(cmd, function (error, response, stderr) {
            if (error) {
                this.log('CMD set BlindsHorizontalAngle function failed: %s', error.message);
                callback(error);
            } else {
                this.log("BlindsHorizontalAngele is %s", parseFloat(response));
                callback(null, parseFloat(response));
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
                    .on('get', this.getTemperature.bind(this));
                return [this.TempSensorservice];
                break;
	    case "Blinds":
		this.Blindservice = new Service.WindowCovering(this.name);
		this.Blindservice
		    .getCharacteristic(Characteristic.CurrentPosition)
		    .on('get' , this.getBlindsCurrentPosition.bind(this));
		this.Blindservice
		    .getCharacteristic(Characteristic.TargetPosition)
		    .on('get' , this.setBlindsCurrentPosition.bind(this));
		this.Blindservice
		    .getCharacteristic(Characteristic.PositionState)
		    .on('get' , this.getPositionState.bind(this));
		this.Blindservice
                        .addCharacteristic(new Characteristic.TargetHorizontalTiltAngle())
                        .on('set', this.setBlindsHorizontalTiltAngle.bind(this));
		this.Blindservice
                        .addCharacteristic(new Characteristic.CurrentHorizontalTiltAngle())
                        .on('get', this.getBlindsHorizontalTiltAngle.bind(this));

		
		return [informationService, this.Blindservice];
		break;

        }
    }
};
