
    const form = document.querySelector('#form')
    const input = document.querySelector('#input')
    const render = document.querySelector('#render')
    let messages = []
    
        const socket = io();
    socket.on('messsage',(data)=>{
      console.log(data);
        messages = data
        console.log(messages);
        messagesRender()
    })
    const messagesRender = () => {
    if(messages.length > 0){
      const messdata = messages.map((item,index)=>{
        return `<li class="list-group-item">User : ${item}</li>`
      }).join('')
      render.innerHTML = messdata
    }
    
    }
    form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (input.value) {
          socket.emit('value', input.value);
          input.value = '';
        }
    })