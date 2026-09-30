let roomRootDiv = document.querySelector("#roomRoot");
let currentRoom = "entry";
let inventory = [];
let keyPickedUp = false;

let rooms = {
    entry: {
        name: "Entry Room",
        description: "You are standing in the entrance of an old building. There are doors leading deeper inside.",
        linkedRooms: [
            { label: "Enter the hallway", destination: "hallway"}
        ]
    },

    hallway: {
        name: "Hallway",
        description: "A long, dark hallway stretches in front of you. You can hear a quiet sound coming from the library.",
        linkedRooms: [
            { label: "Return to the entry room", destination: "entry"},
            { label: "Enter the library", destination: "library"},
            { label: "Go to the gym", destination: "gym"}
        ]
    },

    library: {
        name: "Library",
        description: "Rows of dusty books fill the room. Something shiny is sitting on a table.",
        linkedRooms: [
            { label: "Return to the hallway", destination: "hallway"},
            { label : "Enter the storage room", destination: "storage"}
        ]
    },

    gym: {
        name: "Gym",
        description: "The old gym is surprisingly clean. There is a strange locker in the corner.",
        linkedRooms: [
            { label: "Return to the hallway", destination: "hallway"}
        ]
    },

    storage: {
        name: "Storage Room",
        description: "Boxes and old equipment cover the walls. There is a locked door here.",
        linkedRooms: [
            { label: "Return to the library", destination: "library"}
        ]
    }
};

function renderRoom(room) {
    roomRootDiv.innerHTML = "";
    let hasKey = false;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] == "key") {
            hasKey = true;
        }
    }

    let roomName = document.createElement("h1");
    roomName.innerHTML = room.name;
    roomRootDiv.append(roomName);

    let roomDescription = document.createElement("p");
    roomDescription.innerHTML = room.description;
    roomRootDiv.append(roomDescription);

    for (let i = 0; i < room.linkedRooms.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = room.linkedRooms[i].label;
        button.destination = room.linkedRooms[i].destination;

        if (room.linkedRooms[i].destination == "storage" && hasKey == false) {
            button.innerHTML = "Storage Room (Locked)";
            button.classList.add("locked");
        } else {
            button.classList.remove("locked");
        }
        roomRootDiv.append(button);

        button.addEventListener("click", function(e) {
            if (e.target.innerHTML == "Storage Room (Locked)") {
                roomDescription.innerHTML = "The storage room is locked. You need a key.";
            } else {
                currentRoom = e.target.destination;
                renderRoom(rooms[currentRoom]);
            }
        });
    }

    if (currentRoom == "library" && keyPickedUp == false) {
        let keyButton = document.createElement("button");
        keyButton.innerHTML = "Pick up the key";
        roomRootDiv.append(keyButton);

        keyButton.addEventListener("click", function(e) {
            inventory.push("key");
            keyPickedUp = true;
            renderRoom(rooms[currentRoom]);
        });
    }

    let inventoryTitle = document.createElement("h3");
    inventoryTitle.innerHTML = "Inventory";
    roomRootDiv.append(inventoryTitle);

    let inventoryList = document.createElement("ul");
    roomRootDiv.append(inventoryList);

    for (let i = 0; i < inventory.length; i++) {
        let inventoryItem = document.createElement("li");
        inventoryItem.innerHTML = inventory[i];
        inventoryList.append(inventoryItem);
    }

}
renderRoom(rooms.entry);