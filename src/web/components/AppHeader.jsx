import React from "react";
import { Link } from "react-router-dom";

const blockStyle = {
    float: 'left',
    height: '50%',
    width: '19%',
    border: "1px solid #ddd",
    fontSize: "18px",
    fontFamily: 'Arial, Helvetica, sans-serif',
    textAlign: "center",
    paddingTop: "2%"
};

const AppHeader = () => {
    return (
        <div style={{height:'100%', width:'100%'}}>
            <Link to='/list'>
                <div style={blockStyle}>
                    List Vehicles
                </div>
            </Link>
            <Link to='/find'>
                <div style={blockStyle}>
                    Find Vehicle
                </div>
            </Link>
            <Link to='/insert'>
                <div style={blockStyle}>
                    Insert Vehicle
                </div>
            </Link>
            <Link to='/edit'>
                <div style={blockStyle}>
                    Edit Vehicle
                </div>
            </Link>
            <Link to='/delete'>
                <div style={blockStyle}>
                    Delete Vehicle
                </div>
            </Link>
        </div>
    );
}

export default AppHeader;