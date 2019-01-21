var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 12,
	units: "imperial",

	modules: [
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "alert",
			config: {}
		},
		{
			module: "calendar",
			header: "Calendar",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check-o ",
						url: "https://calendar.google.com/calendar/ical/anthonybrog%40gmail.com/private-3b50436d54f6c7b59413ba36ba5c0d08/basic.ics"
					},
					{
						symbol: "calendar-check-o ",
						url: "https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics"
					},
				]
			}
		},
{
      module: "MMM-NotificationTrigger",
      config: {
        triggers:[
          {
            trigger: "HOTWORD_DETECTED",
            fires: [
              {
                fire:"HOTWORD_PAUSE",

              },
              {
                fire:"ASSISTANT_ACTIVATE",
		delay: 200,
                payload: function(payload) {
                  return {
                    "profile": payload.hotword
                  }
                }
              },
            ]
          },
          {
            trigger: "ASSISTANT_DEACTIVATED",
            fires: [
              {
                fire:"HOTWORD_RESUME"
              }
            ]
          },
        ]
      }
},
{
      module: "MMM-Hotword",
      config: {}
},
{
      module: "MMM-AssistantMk2",
      position: "bottom_left",
      config: {
    // --- ESSENTIALS / modifying for your environment might be needed.


    deviceLocation: {
      coordinates: { // set the latitude and longitude of the device to get localized information like weather or time. (ref. mygeoposition.com)
        latitude: 44.783144, // -90.0 - +90.0
        longitude: -93.204665, // -180.0 - +180.0
      },
    },

    defaultProfile: "default", // If you have several profiles and want to set one of them as default profile, describe here.

    profiles: {
      "default" : { // profile name.
        profileFile: "default.json", // profile file name.
        lang: "en-US"
        //currently available (estimation, not all tested):
        //  de-DE, en-AU, en-CA, en-GB, en-US, en-IN
        // fr-CA, fr-FR, it-IT, ja-JP, es-ES, es-MX, ko-KR, pt-BR
        // https://developers.google.com/assistant/sdk/reference/rpc/languages
      },
      /* Add your other profiles here, if exists.
      "other_profile" : {
        profileFile: "other.json",
        lang: "de-DE"
      }
      */
    },

    record: { // Full values are in `FOR EXPERTS` section.
      recordProgram: "arecord",  // Defaults to "arecord" - also supports "rec" and "sox"
      device: null        // recording device (e.g.: "plughw:1")
    },

    play: { // Full values are in `FOR EXPERTS` section.
      playProgram: "mpg321", // recommended.
    },
// --- OPTIONAL / not important but customizable for your usage


    responseVoice: true, // If available, Assistant will response with her voice.
    responseScreen: true, // If available, Assistant will response with some rendered HTML
    responseAlert: true, // If available, Assistant will response with Alert module of MM
    // Sometimes, any response might not be returned. responseAlert is useful for displaying error.

    screenZoom: "80%", // Adjust responseScreen to your mirror size.
    screenDuration: 0, // milliseconds. How long responseScreen will be shown after speech.
    //If you set 0, Screen Output will be closed after Response speech finishes ASAP.

    youtubeAutoplay: true, //If set as true, found Youtube video will be played automatically.
    pauseOnYoutube:true, //If set as true, You cannot activate Assistant during youtube playing. Recommended for the performance (Because permanent hotword detecting might make performance lower)

    //useWelcomeMessage: "brief today", //Try "brief today" as this value. You can use this value to check module working when MM is starting.

    onIdle: {
      timer: 1000*60*30, // if you don't want to use this feature, just set timer as `0` or command as ""
      command: "HIDEMODULES"
    },

    onActivate: {
      timer: 0,
      command: "SHOWMODULES"
    },

// --- FOR EXPERTS / For development, debug or more


    verbose:false, // You can get error or some logs when this value is set as true.

    startChime: "connection.mp3", // you can use `mp3` to play chime when your mic is ready. It should be playable with your `play.playProgram`

    auth: { // I believe you don't need to change this.
      keyFilePath: "./credentials.json"
    },

    record:  { // Full version
      sampleRate    : 16000,      // audio sample rate
      threshold     : 0.5,        // silence threshold (rec only)
      thresholdStart: null,       // silence threshold to start recording, overrides threshold (rec only)
      thresholdEnd  : null,       // silence threshold to end recording, overrides threshold (rec only)
      silence       : 1.0,        // seconds of silence before ending
      verbose       : false,      // log info to the console
      recordProgram : "arecord",  // Defaults to "arecord" - also supports "rec" and "sox"
      device        : null        // recording device (e.g.: "plughw:1")
    },

    play: { // Full version
      encodingOut: "MP3", //'MP3' or 'WAV' is available, but you might not need to modify this.
      sampleRateOut: 24000,
      playProgram: "mpg321", //Your prefer sound play program. By example, if you are running this on OSX, `afplay` could be available.
      playOption: [],
      // If you need additional options to use playProgram, describe here. (except filename)
      // e.g: ["-d", "", "-t", "100"]
    },

    useGactionCLI: true, // If set as true, you can update your gAction when MM is rebooted.
    projectId: "ai-smart-mirror-8d660", // Google Assistant ProjectId (Required only when you use gAction.)
    deviceModelId: "ai-smart-mirror-8d660-ai-smart-mirror-4n8kdp", // It should be described in your config.json. In most of case, you don't need to this.
    deviceInstanceId: "ai_smart_mirror", // It should be described in your config.json. In most of case, you don't need to this.

    action:{}, // You can catch your gAction command.

    transcriptionHook: {
  "HIDE_ALL_MODULES": {
    pattern: "hide all modules",
    command: "HIDEMODULES"
  },
  "SHOW_ALL_MODULES": {
    pattern: "show all modules",
    command: "SHOWMODULES"
  },
  "SCREEN_ON": {
    pattern: "screen on",
    command: "SCREENON"
  },
  "SCREEN_OFF": {
    pattern: "screen off",
    command: "SCREENOFF"
  },
  "REBOOT": {
    pattern: "reboot",
    command: "REBOOT"
  },
  "SHUTDOWN": {
    pattern: "shutdown",
    command: "SHUTDOWN"
  }
 }, 

    command: {}, // You can make your own MM command for gAction and transcriptionHook

    notifications: { // You can redefine these notifications to communicate with specific modules.
      ASSISTANT_ACTIVATE: "ASSISTANT_ACTIVATE",
      ASSISTANT_DEACTIVATE: "ASSISTANT_CLEAR",
      ASSISTANT_ACTIVATED: "ASSISTANT_ACTIVATED",
      ASSISTANT_DEACTIVATED: "ASSISTANT_DEACTIVATED",
      ASSISTANT_ACTION: "ASSISTANT_ACTION",
      DEFAULT_HOOK_NOTIFICATION: "ASSISTANT_HOOK",
      TEXT_QUERY: "ASSISTANT_QUERY",
    }
  }
},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Eagan",
				locationID: "5024825",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "b17ae4ed760b46cc546fa6c2edc92a2b"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Eagan",
				locationID: "5024825",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "b17ae4ed760b46cc546fa6c2edc92a2b"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_center",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					},
					{
						title: "CNN",
						url: "http://rss.cnn.com/rss/cnn_topstories.rss"
					},
					{
						title: "BBC News",
						url: "http://feeds.bbci.co.uk/news/rss.xml"
					},
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
{
  module: "MMM-NowPlayingOnSpotify",
  position: "bottom_right",

  config: {
    clientID: "ee3226d615784abc9babd7d60e59d49a",
    clientSecret: "b7719e4675074fa1b982c57a5856c39f",
    accessToken: "BQBiIHUHwPmOkUxrpY4MAoxabe8qalXaSZrLA06seTcBxlhzo0CFmNBA8ArZbH9B2-Tt8nqIk-xBa0EjHnEoiGC-S8IQWjoPGX2CameN3ez7g-sysk7T8zMsXP93lx7XGZDrASTou-GFNoetb2oLoA",
    refreshToken: "AQAUzD3XMsX_DshPjq_xLzU-AgWalUUkWuSa5V4lhqBIxGH3epVP-uTkpWPGUaGFFtgWHwQWO0QX6sggEmJbj6aoo02YhjhKXX_e1ERCZ0PnntRsvYqLWvw9h2QyaRboQD4dhw"
  }
},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
