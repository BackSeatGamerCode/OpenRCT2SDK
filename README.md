# OpenRCT2SDK
The Official OpenRCT2 SDK for BackSeatGamer Integration

## Setup
This SDK requires [BackSeatGamer Reverse Proxy](https://github.com/BackSeatGamerCode/ReverseProxy) to be running in `TCP/IP Broadcast` Mode using `JSON` format. By default, port 29175 will be used. In the future, we plan on adding a way for the user to change this if nessisary.

OpenRCT2 will only run a plugin (what they call mods) if a park is open, so to reload your plugin, simply quit to the main menu, and open a map. As a result, [BackSeatGamer Reverse Proxy](https://github.com/BackSeatGamerCode/ReverseProxy) will fail to establish a connection unless the map is open. If you try to start [BackSeatGamer Reverse Proxy](https://github.com/BackSeatGamerCode/ReverseProxy) and the map is not open, you will be presented with a dialog box informing you a connection could not be established. Simply click `OK` to try again. If everything is successful, you will be presented with the rewards interface.

## Usage
To start, place `BackSeatGamerSDK.js` in your OpenRCT2 plugins folder, and rename it to reflect the name of your mod. You can find the exact location in the [OpenRCT2 Official Scripting Guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md). Once the file is in place, open it in your favorite text editor. This next part assumes a very basic knowledge of JavaScript.

The first step is to customize the details of your plugin. At the bottom of the file, there is the following code:
```js
registerPlugin({
    name: 'BackSeatGamer OpenRCT2 SDK',
    version: '1.0',
    authors: ['BackSeatGamer', 'CPSuperstore'],
    type: 'remote',
    licence: 'MIT',
    targetApiVersion: 34,
    main: main
});
```

Feel free to customize this however you want, but do not change `main` at all, and do not change `type` or `targetApiVersion` unless you know what you are doing. Feel free to change anything else. OpenRCT2 plugins generally use the MIT licence, but again, you can change this to whatever you want. No credit to BackSeatGamer or CPSuperstore is nessisary.

With that out of the way, near the top of the file, go to the following code:
```js
var REWARDS = {};
```

This object will store each of the commands which could be used. The key of the object is the string of the command, and the value is a function which executes the reward (or calls a different function which is recomended for readability purposes). The function can optionally take three parameters:
`name`, which is the name of the guest who redeemed the reward, `reward` is the display name of the reward, and `command` is the command used to execute the reward.

For example, the OpenRCT2 Plugin we created to develop and test the SDK has the following rewards:
```js
var REWARDS = {
    "difficultGuestGeneration": function(name, reward, command){ temporaryFlagToggle("difficultGuestGeneration", 5, reward); },
    "difficultParkRating":      function(name, reward, command){ temporaryFlagToggle("difficultParkRating", 5, reward); },
    "forbidHighConstruction":   function(name, reward, command){ temporaryFlagToggle("forbidHighConstruction", 5, reward); },
    "forbidLandscapeChanges":   function(name, reward, command){ temporaryFlagToggle("forbidLandscapeChanges", 5, reward); },
    "forbidMarketingCampaigns": function(name, reward, command){ temporaryFlagToggle("forbidMarketingCampaigns", 5, reward); },
    "forbidTreeRemoval":        function(name, reward, command){ temporaryFlagToggle("forbidTreeRemoval", 5, reward); },
    "freeParkEntry":            function(name, reward, command){ temporaryFlagToggle("freeParkEntry", 1, reward); },
    "noMoney":                  function(name, reward, command){ temporaryFlagToggle("noMoney", 1, reward); },
    "open":                     function(name, reward, command){ temporaryFlagToggle("open", 1, reward); },
    "renameRandomRide":         function(name, reward, command){ renameRandomRide(name); },
    "maxBankLoan":              function(name, reward, command){ park.bankLoan = park.maxBankLoan; },
    "halfRating":               function(name, reward, command){ park.rating = Math.floor(park.rating / 2); },
    "loan1000":                 function(name, reward, command){ park.bankLoan += 10000; },
    "renamePark":               function(name, reward, command){ park.name = name; },
    "crash":                    function(name, reward, command){ crashRandomCar() },
    "creeper":                  function(name, reward, command){ creeper() },
    "sploosh":                  function(name, reward, command){ sploosh() }
};
```

Some of these rewards call custom functions in the plugin (like `difficultGuestGeneration`), while others execute the reward right in place (like `maxBankLoan`).

The SDK will automatically send the notification at the bottom of the screen which alerts the player of a new redemption. All you need to do as the mod creator, is simply to populate the `REWARDS` object with whichever rewards you choose.

## OpenRCT2 Plugin Resources
The OpenRCT2 Plugin official documentation is still a work in progress, so here are resources I found helpful while developing the SDK and the test mod:
- https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md
- https://github.com/OpenRCT2/OpenRCT2/blob/d071693808f1024a3237c5f65be31acb16968e2a/distribution/openrct2.d.ts

## Issues/Feedback
If you encounter any problems, or have suggestions for future updates, feel free to leave them over in the [Issue Tracker](https://github.com/BackSeatGamerCode/OpenRCT2SDK/issues). Alternativley, if you have questions or want to discuss something with your fellow OpenRCT2 modders, then check out our [Discussions](https://github.com/BackSeatGamerCode/OpenRCT2SDK/discussions). Thank you for using OpenRCT2 modding SDK, and good luck with your mod!
