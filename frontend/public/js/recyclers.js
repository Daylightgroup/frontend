function toggleChat(){

let bot=document.getElementById("chatbot")

bot.style.display=bot.style.display==="flex"?"none":"flex"

}

function sendMessage(){

let input=document.getElementById("chatInput")

let body=document.getElementById("chatBody")

let msg=input.value

if(msg==="")return

body.innerHTML+=`<p><b>You:</b> ${msg}</p>`

body.innerHTML+=`<p><b>AI:</b> Our trade desk will assist you regarding ${msg}. Please submit a consultation request.</p>`

input.value=""

body.scrollTop=body.scrollHeight

}