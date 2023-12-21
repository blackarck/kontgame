var username = "";
var socket;
var connectionEstablish = false;
window.onload = initFunction();
// connect to server

function initFunction() {
  const sessionID = localStorage.getItem("sessionID");
  if (sessionID) {
    //user already logged in previously
    console.log("Session id is " + sessionID);
    var authdata = {
      username: "vivek",
      sessionid: sessionID,
    };
  } else {
    //new user assign a session ID
    var authdata = {
      username: "vivek",
      sessionid: "",
    };
  }
  try {
    socket = io("ws://localhost:3000");
    socket.auth = { authdata };
    socket.connect();
    connectionEstablish = true;
  } catch (error) {
    connectionEstablish = false;
    console.log("Error " + error);
  }
} //end of function initfunction

function signinbutton(nameentered) {
  //console.log(`Name setup is ${nameentered}`);
  username = nameentered;
  sendPosition();
}

if (connectionEstablish) {
  socket.on("hello", (arg) => {
    console.log(arg);
  });

  socket.on("session", ({ sessionID, userID }) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    console.log("session id is " + JSON.stringify(sessionID));
    localStorage.setItem("sessionID", sessionID);
    // save the ID of the user
    socket.userID = userID;
  });

  socket.on("getPosition", ({ userid, posdata }) => {
    //console.log("getpos uid-"+userid + " sockuserid-"+socket.userID);
    //console.log("posdata "+JSON.stringify(posdata))
    otherPlayers = []; //flush out the array
    //repopulate the array
    otherPlayers.push({ userid, posdata });
  });
}

function sendPosition() {
  console.log("connectionEstablish", connectionEstablish);
  if (connectionEstablish) {
    socket.emit("updatePosition", snakefull);
  }
} //end of sendPosition
