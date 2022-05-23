var REWARDS = {};

function postMessage(message){
    try {
        park.postMessage({
            type: "award",
            text: message
        });
    } catch (error) {
        console.log(error);
    }
}

function main() {
    postMessage("BackSeatGamer Initialized...");

    var server = network.createListener();
    server.on('connection', function (conn) {
        conn.on('data', function(data) {
            conn.write("done");

            data = JSON.parse(data);

            var command = data["command"];
            var reward = data["name"];
            var user = data["guest"];

            if(REWARDS.hasOwnProperty(command)){
                postMessage(user + " has redeemed the reward " + reward);
                REWARDS[command](user, reward, command);

            } else {
                postMessage("Unknown Command: " + command);
            }
        });
    });
    server.listen(29175);
}

registerPlugin({
    name: 'BackSeatGamer OpenRCT2 SDK',
    version: '1.0',
    authors: [],
    type: 'remote',
    licence: 'MIT',
    targetApiVersion: 34,
    main: main
});
