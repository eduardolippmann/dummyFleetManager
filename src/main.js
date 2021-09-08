const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const controller = require('./core/controller.js');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile('src/web/bundle/index.html');
}

function setupAppEvents() {
  ipcMain.on("InsertVehicle", function (ev, vehicleInfo) {
    controller.insertVehicle(vehicleInfo, function(err, data) {
    });
  });
  ipcMain.on("EditVehicle", function (ev, vehicleInfo) {
    controller.editVehicle(vehicleInfo, function(err, data) {
    });
  });
  ipcMain.on("FindVehicle", function (ev, chassisInfo) {
    controller.findVehicle(chassisInfo, function(err, data) {
    });
  });
  ipcMain.on("ListAllVehicles", function (ev) {
    controller.listVehicles(function(err, data) {
    });
  });
  ipcMain.on("DeleteVehicle", function (ev, chassisInfo) {
    controller.deleteVehicle(chassisInfo, function(err, data) {
    });
  });
}

function main() {
  app.whenReady().then(() => {
    createWindow();
    setupAppEvents();
  });
}

main();