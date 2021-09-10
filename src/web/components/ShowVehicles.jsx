import React from "react";

const thStyle = {
    backgroundColor: "#1c6bba",
    textAlign: "left",
    color: "white",
    border: "1px solid #ddd",
    padding: "8px"
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px"
};

const tableStyle={
    fontFamily: 'Arial, Helvetica, sans-serif',
    borderCollapse: "collapse",
    width: '100%'
};

const ShowVehicles = (props) => {
    if(!Array.isArray(props.vehicles) || !props.vehicles.length) {
        return <div>No vehicles have been registered</div>
    }
    return (
        <table style={tableStyle}>
            <tr>
                <th style={thStyle}>Chassis Series</th>
                <th style={thStyle}>Chassis Number</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Color</th>
                <th style={thStyle}>Number of Passengers</th>
            </tr>
            {props.vehicles.map((vehicle)=>(
            <tr>
                <td style={tdStyle}>{vehicle.chassisSeries}</td>
                <td style={tdStyle}>{vehicle.chassisNumber}</td>
                <td style={tdStyle}>{vehicle.type}</td>
                <td style={tdStyle}>{vehicle.color}</td>
                <td style={tdStyle}>{vehicle.numberOfPassengers}</td>
            </tr>
            ))}
        </table>
    );
}

export default ShowVehicles;