const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('fleetAPI', {
    insertVehicle : (data) => ipcRenderer.send('InsertVehicle', data),
    listVehicles : (data) => ipcRenderer.send('ListAllVehicles', data),
    findVehicle : (data) => ipcRenderer.send('FindVehicle', data),
    editVehicle : (data) => ipcRenderer.send('EditVehicle', data),
    deleteVehicle : (data) => ipcRenderer.send('DeleteVehicle', data),
    onListVehiclesReply : (cb) => ipcRenderer.on('ListAllVehiclesReply', function (ev, data) {cb(data)}),
    onInsertComplete : (cb) => ipcRenderer.on('InsertVehicleReply', function (ev, data) {cb(data)}),
    onInsertError : (cb) => ipcRenderer.on('InsertVehicleError', function (ev, data) {cb(data)}),
    onFindComplete : (cb) => ipcRenderer.on('FindVehicleReply', function (ev, data) {cb(data)}),
    onFindError : (cb) => ipcRenderer.on('FindVehicleError', function (ev, data) {cb(data)}),
});