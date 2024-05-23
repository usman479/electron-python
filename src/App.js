import logo from './logo.svg';
import './App.css';
// import { ipcRenderer } from 'electron';
const electron = window.require('electron');
const { ipcRenderer } = electron;


function App() {
  const hell = () =>  {
    console.log(ipcRenderer)

    ipcRenderer.send("msg","hello!")
    ipcRenderer.on("reply",(event,data) => {
      console.log(data)
    })
    // setting up an event listener to read data that background process
		// will send via the main process after processing the data we
		// send from visiable renderer process
		ipcRenderer.on('MESSAGE_FROM_BACKGROUND_VIA_MAIN', (event, args) => {
			console.log(args);
		});

		// trigger event to start background process
		// can be triggered pretty much from anywhere after
		// you have set up a listener to get the information
		// back from background process, as I have done in line 13
		ipcRenderer.send('START_BACKGROUND_VIA_MAIN', {
			number: 25,
		});

    ipcRenderer.send(
      'BACKGROUND_PROCESS_START', 
      { 
        "Key1": 5,
        "Key2": 456
        }
    );

    console.log("here")
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={hell}>
          ipc renderer
        </button>
      </header>
    </div>
  );
}

export default App;
