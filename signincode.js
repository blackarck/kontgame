var username='';
const socket = io("ws://localhost:3000");
window.onload= initFunction();
 // connect to server



 function initFunction(){
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      //user already logged in previously
      console.log("Session id is "+sessionID);
      var authdata={
        username: "vivek",
        sessionid: sessionID
      }
    }else{
      //new user assign a session ID
        var authdata={
          username: "vivek",
          sessionid: ''
        } 
    }
    socket.auth = { authdata };
    socket.connect();
 }//end of function initfunction

function signinbutton(nameentered){
    //console.log(`Name setup is ${nameentered}`);
    username=nameentered;
    sendPosition();
}

  socket.on("hello",(arg)=>{
    console.log(arg);
  });

 socket.on("session", ({ sessionID, userID }) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
  // store it in the localStorage
  console.log("session id is "+JSON.stringify(sessionID));
  localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.userID = userID;
});

socket.on("getPosition",({userid, posdata})=>{
  //console.log("getpos uid-"+userid + " sockuserid-"+socket.userID);
  //console.log("posdata "+posdata)
  if(userid != socket.userID){
    //draw that snake
    console.log("recieved pos "+JSON.stringify(posdata));
  }
});


function sendPosition() {
  //console.log("Sending pos "+JSON.stringify(snakefull));
  socket.emit('updatePosition', snakefull);
}