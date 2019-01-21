//
// Module : MMM-Hotword
//


Module.register("MMM-Hotword", {
	defaults: {
		snowboy: [
			{
				hotwords: "smartmirror", //this will be sended to other module for distinguishing which hotword is detected.
				file: "resources/models/smart_mirror.umdl",
				sensitivity: '0.5',
			},
			{
				hotwords: "magicmirror", //this will be sended to other module for distinguishing which hotword is detected.
				file: "resources/models/magic_mirror.pmdl",
				sensitivity: '0.5',
			},
			{
				hotwords: "okgoogle", //this will be sended to other module for distinguishing which hotword is detected.
				file: "resources/models/ok_google.pmdl",
				sensitivity: '0.5',
			},
			{
				hotwords: "heygoogle", //this will be sended to other module for distinguishing which hotword is detected.
				file: "resources/models/hey_google.pmdl",
				sensitivity: '0.5',
			}
		],
		record: {
			sampleRate    : 16000,      // audio sample rate
			threshold     : 0.5,        // silence threshold (rec only)
			thresholdStart: null,       // silence threshold to start recording, overrides threshold (rec only)
			thresholdEnd  : null,       // silence threshold to end recording, overrides threshold (rec only)
			silence       : 1.0,        // seconds of silence before ending
			verbose       : false,      // log info to the console
			recordProgram : 'arecord',  // Defaults to 'arecord' - also supports 'rec' and 'sox'
			device        : null        // recording device (e.g.: 'plughw:1')

		},
		autostart: true,
		autorestart: false,
	},

	notificationReceived: function (notification, payload, sender) {
		switch(notification) {
			case 'ALL_MODULES_STARTED':
				if(this.config.autostart == true) {
					this.sendSocketNotification('RESUME')
				}
				break
			case 'HOTWORD_RESUME':
				this.sendSocketNotification('RESUME')
				break
			case 'HOTWORD_PAUSE':
				this.sendSocketNotification('PAUSE')
				break
		}
	},

	socketNotificationReceived: function (notification, payload) {
		switch(notification) {
			case 'INITIALIZED':
				//do nothing
				break
			case 'NOT_PAUSED':
				this.sendNotification('HOTWORD_LISTENING')
				break
			case 'NOT_RESUMED':
				this.sendNotification('HOTWORD_SLEEPING')
				break
			case 'RESUMED':
				this.sendNotification('HOTWORD_LISTENING')
				break
			case 'PAUSED':
				this.sendNotification('HOTWORD_SLEEPING')
				break
			case 'DETECTED':
				this.sendNotification('HOTWORD_DETECTED', payload)
				break
			case 'ERROR':
				this.sendNotification('HOTWORD_ERROR', payload)
				console.log('[HOTWORD] Error: ', payload)
				break
		}
	},

	start: function () {
		this.isInitialized = 0
		this.config = this.configAssignment({}, this.defaults, this.config)
		this.sendSocketNotification('INIT', this.config)
	},

	configAssignment : function (result) {
		var stack = Array.prototype.slice.call(arguments, 1);
		var item;
		var key;
		while (stack.length) {
			item = stack.shift();
			for (key in item) {
				if (item.hasOwnProperty(key)) {
					if (
						typeof result[key] === 'object'
						&& result[key]
						&& Object.prototype.toString.call(result[key]) !== '[object Array]'
					) {
						if (typeof item[key] === 'object' && item[key] !== null) {
							result[key] = this.configAssignment({}, result[key], item[key]);
						} else {
							result[key] = item[key];
						}
					} else {
						result[key] = item[key];
					}
				}
			}
		}
		return result;
	},
})
