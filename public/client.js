const socket = io()
let naam;

let textarea = document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area')
do{
  naam = prompt('Please enter your name')
}while(!naam)

textarea.addEventListener('keyup',(e)=>{
    if(e.key == 'Enter'){
      sendMessage(e.target.value)//jo b textarea k ander h pass ho jayega
    }
})

function sendMessage(message){
  let msg = {
    user: naam,
    message: message
  }
  //Append in div on sending
  appendMessage(msg, 'outgoing')
  scrollToBottom();
  textarea.value=''
  //send to server
  socket.emit('message', msg) //message is name of event

}

function appendMessage(msg,type){
  let mainDiv = document.createElement('div')
  let className= type
  mainDiv.classList.add(className,'message')//adding classes on that div

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `
  mainDiv.innerHTML = markup
  messageArea.appendChild(mainDiv)
}

//Receive msg
socket.on('message',(msg)=>{
  //console.log(msg)
  appendMessage(msg,'incoming')
  scrollToBottom();
})

function scrollToBottom(){
  messageArea.scrollTop = messageArea.scrollHeight
}