const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('fleetAPI', {
    insertVehicle : (data) => ipcRenderer.send('InsertVehicle', data),
    listVehicles : (data) => ipcRenderer.send('ListAllVehicles', data),
    findVehicle : (data) => ipcRenderer.send('FindVehicle', data),
    editVehicle : (data) => ipcRenderer.send('EditVehicle', data),
    deleteVehicle : (data) => ipcRenderer.send('DeleteVehicle', data),
    // onInsertComplete : (cb) => ipcRenderer.on('InsertVehicleReply', function (ev, data) {cb(data)})
});