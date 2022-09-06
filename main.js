require('dotenv').config();
// const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const { app, BrowserWindow, Menu } = require('electron');
const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;
let aboutWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    // window Styles
    backgroundColor: "#dfdfdf"

  });

  // mainWindow.loadURL('https://google.com');
  mainWindow.loadFile('./app/index.html');
}

// pop up?
const createAboutWindow = () => {
  aboutWindow = new BrowserWindow({
    title: "About ImageShrink",
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    // window Styles
    backgroundColor: "#dfdfdf"

  });

  // mainWindow.loadURL('https://google.com');
  aboutWindow.loadFile('./app/about.html');
}

// Menu template
const menu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: createAboutWindow
      }
    ]
  }] : []),
  {
    // label: '&File',
    // accelerator: 'alt-F',
    // submenu: [
    //   {
    //     label: 'Quit',
    //     accelerator: isMac ?  "Command+W" : "Ctrl+W", // for shortcut
    //     click: () => app.quit()
    //   }
    // ]
    role: 'fileMenu'
  },
  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow
        }
      ]
    }
  ] : []),
  ...(isDev ? [{
    label: 'Developer',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'toggledevtools' },
    ]
  }] : [])
]


app.on('ready', () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // substituido pelos roles n' types
  // globalShortcut.register(`${isMac ?  "Command+" : "Ctrl+"}R`, () => {
  //   mainWindow.reload();
  // });
  // globalShortcut.register(`${isMac ?  "Command+Alt+" : "Ctrl+Shift+"}I`, () => {
  //   mainWindow.toggleDevTools();
  // });

  mainWindow.on('closed', () => mainWindow = null);
});


// mac system
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.allowRendererProcessReuse = true;