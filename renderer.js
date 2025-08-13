const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const game = document.getElementById('game')

const func = async () => {
    const response = await window.versions.ping()
    game.innerText = `Ping ${response}`
    console.log(response) // prints out 'pong'
  }
  
  func()