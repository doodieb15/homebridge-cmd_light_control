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
    this.brightness_cmd = config["brightness_cmd"];
    this.name = config["name"];
    this.service = config["service"] || "Switch";
    this.brightnessHandling     = config["brightnessHandling"] 	 	|| "no";


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

    setBrightness: function (level, callback) {

        var cmd = this.brightness_cmd.replace("%b", level)

        this.log("Setting brightness to %s", level);

        this.cmdRequest(cmd, function (error, stdout, stderr) {
            if (error) {
                this.log('CMD brightness function failed: %s', error);
                callback(error);
            } else {
                this.log('CMD brightness function succeeded!');
                callback();
                this.log
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
                    .on('set', this.setPowerState.bind(this));
                return [this.switchService];
                break;
            case "Light":
                this.lightbulbService = new Service.Lightbulb(this.name);
                this.lightbulbService
                    .getCharacteristic(Characteristic.On)
                    .on('set', this.setPowerState.bind(this));
                if (this.brightnessHandling == "yes") {
                    this.lightbulbService
                        .addCharacteristic(new Characteristic.Brightness())
                        .on('set', this.setBrightness.bind(this));
                }

                return [informationService, this.lightbulbService];
                break;
        }
    }
};
