import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import { ipcRenderer } from 'electron';
const electron = window.require('electron');
const { ipcRenderer } = electron;



function App() {
  const [fact, setFact] = useState(0);
  const [file1,setFile1] = useState(null);
  console.log(file1)
  const hell = () =>  {
    console.log(ipcRenderer)

    // ipcRenderer.send("msg","hello!")
    // ipcRenderer.on("reply",(event,data) => {
    //   console.log(data)
    // })
    // setting up an event listener to read data that background process
		// will send via the main process after processing the data we
		// send from visiable renderer process
		ipcRenderer.on('MESSAGE_FROM_BACKGROUND_VIA_MAIN', (event, args) => {
      console.log('seventh')
			console.log(args);
      setFact(args)
		});

		// trigger event to start background process
		// can be triggered pretty much from anywhere after
		// you have set up a listener to get the information
		// back from background process, as I have done in line 13
    const factorial = document.getElementById('factorial').value
    console.log(factorial)
		ipcRenderer.send('START_BACKGROUND_VIA_MAIN', {
			number: Number(factorial),
		});

    // ipcRenderer.send(
    //   'BACKGROUND_PROCESS_START', 
    //   { 
    //     "Key1": 5,
    //     "Key2": 456
    //     }
    // );
  }
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      {/* <input type='text' onChange={setFact(e => e.target.value)} value={fact}/> */}
      <input type='file' onChange={(e) => setFile1(e.target.files[0].path)}/>
      <p>File:  {file1}</p>
      <h1 style={{
        color:"blue"
      }}>Find Factorial of any Number</h1>
      <input type='text' id='factorial' style={{
        margin:"20px"
      }}/>
      <button onClick={hell}>Factorial</button>
      <h1 style={{
        fontSize:"8rem"
      }}>{fact}</h1>
    </div>
  );
}

export default App;
