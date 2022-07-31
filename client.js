
    const form = document.querySelector('#form')
    const input = document.querySelector('#input')
    const render = document.querySelector('#render')
    const sendLocation = document.querySelector('.send-location')
    let messages = []
    
        const socket = io();
    socket.on('messsage',(data)=>{
        messages = data
        console.log(messages);
        messagesRender()
    })
    socket.on('joined',(data)=>{
      console.log(data);
    })
    socket.on('location',(data)=>{
      console.log(data);
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

    sendLocation.addEventListener('click',()=>{
      if(!navigator.geolocation){
        alert('Not supported')
      }
      navigator.geolocation.getCurrentPosition((possition)=>{
        console.log(possition);
        socket.emit('send-location',{
          latitude : possition.coords.latitude,
          longitude : possition.coords.longitude
        })
      })
    })