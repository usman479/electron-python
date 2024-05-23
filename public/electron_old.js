const electron = require('electron');
const path = require('path');
const url = require('url');
const { ipcMain } = require('electron');
// const loadBalancer = require('electron-load-balancer');

const { app } = electron;
const { BrowserWindow } = electron;
const nativeImage = electron.nativeImage;

if (process.env.DEV) {
    const {
        default: installExtension,
        REDUX_DEVTOOLS,
        REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer');

    app.whenReady().then(() => {
        installExtension(REDUX_DEVTOOLS).then(name =>
            console.log(`Added Extension:  ${name}`),
        );
        installExtension(REACT_DEVELOPER_TOOLS).then(name =>
            console.log(`Added Extension:  ${name}`),
        );
    });
}

const icon = nativeImage.createFromPath(path.join(__dirname, 'app_icon.png'));
let mainWindow;

function createWindow() {
    const startUrl = process.env.DEV || 1
        ? 'http://localhost:3000'
        : url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true,
        });
    mainWindow = new BrowserWindow({
        show: false,
        icon,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation:false,
            enableRemoteModule: true,
        },
        minWidth: 500,
        minHeight: 300,
    });
    mainWindow.maximize();
    mainWindow.show();

    mainWindow.loadURL(startUrl);
    process.env.DEV && mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        // loadBalancer.stopAll();
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

/* ----------------------------------- Custom code starts here ------------------------------------- */

// 1. Register background tasks (the keys will be used for reference later)
// loadBalancer.register(
//   ipcMain,
//   {
//     preemptive_loop: '/background_tasks/preemptive_loop.html',
//     one_shot: '/background_tasks/one_shot.html',
//   },
//   { debug: false },
// );

// 2. Set up eventlisteners to bounce message from background to UI 
// ipcMain.on('PREEMPTIVE_LOOP_RESULT', (event, args) => {
//   mainWindow.webContents.send('PREEMPTIVE_LOOP_RESULT', args);
// });
// ipcMain.on('ONE_SHOT_RESULT', (event, args) => {
//   mainWindow.webContents.send('ONE_SHOT_RESULT', args);
// });


// ipcMain.on(
//     'EVENT_LISTENER_NAME', 
//     (event, args) => {
//       /* ---- Code to execute as callback ---- */
//     }
//   );

ipcMain.on('BACKGROUND_READY', (event, args) => {             
    event.reply('START_PROCESSING', {  data: cache.data, });
  });

// ------------------- set up event listeners here --------------------

// This event listener will listen for request 
// from visible renderer process
ipcMain.on('START_BACKGROUND_VIA_MAIN', (event, args) => {
	(event, args) => { 
        const backgroundFileUrl = url.format(
          { pathname: path.join(__dirname,   
          `../background_tasks/background.html`),  
          protocol: 'file:',  
          slashes: true, }
        ); 
        hiddenWindow = new BrowserWindow({  show: false,    
          webPreferences: {   nodeIntegration: true,  }, 
        });      
        hiddenWindow.loadURL(backgroundFileUrl);         
        hiddenWindow.webContents.openDevTools();       
        hiddenWindow.on('closed', () => {  hiddenWindow = null; });   
        cache.data = args.number;
      }
});

// This event listener will listen for data being sent back 
// from the background renderer process
ipcMain.on('MESSAGE_FROM_BACKGROUND', (event, args) => {
	/* ---- Code to execute as callback ---- */
});

