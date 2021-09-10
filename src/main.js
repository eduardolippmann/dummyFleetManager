const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const controller = require('./core/controller.js');

function createWindow() {
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
        controller.insertVehicle(vehicleInfo, function (err, data) {
            if (err) {
                ev.reply('InsertVehicleError', err);
            }
            else {
                ev.reply('InsertVehicleReply', data);
            }
        });
    });
    ipcMain.on("EditVehicle", function (ev, vehicleInfo) {
        controller.editVehicle(vehicleInfo, function (err, data) {
            if (err) {
                ev.reply('EditVehicleError', err);
            }
            else {
                ev.reply('EditVehicleReply', data);
            }
        });
    });
    ipcMain.on("FindVehicle", function (ev, chassisInfo) {
        controller.findVehicle(chassisInfo, function (err, data) {
            if (err) {
                ev.reply('FindVehicleError', err);
            }
            else {
                ev.reply('FindVehicleReply', data);
            }
        });
    });
    ipcMain.on("ListAllVehicles", function (ev) {
        controller.listVehicles(function (err, data) {
            ev.reply('ListAllVehiclesReply', data);
        });
    });
    ipcMain.on("DeleteVehicle", function (ev, chassisInfo) {
        controller.deleteVehicle(chassisInfo, function (err, data) {
            if (err) {
                ev.reply('DeleteVehicleError', err);
            }
            else {
                ev.reply('DeleteVehicleReply', data);
            }
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