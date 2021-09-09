import React from "react";
import { Link } from "react-router-dom";

const blockStyle = {
    float: 'left',
    height: '100%',
    width: '20%'
};

const AppHeader = () => {
    return (
        <div style={{height:'10%', width:'100%'}}>
            <Link to='/list'>
                <div style={blockStyle}>
                    List
                </div>
            </Link>
            <Link to='/find'>
                <div style={blockStyle}>
                    Find
                </div>
            </Link>
            <Link to='/insert'>
                <div style={blockStyle}>
                    Insert
                </div>
            </Link>
            <Link to='/edit'>
                <div style={blockStyle}>
                    Edit
                </div>
            </Link>
            <Link to='/delete'>
                <div style={blockStyle}>
                    Delete
                </div>
            </Link>
        </div>
    );
}

export default AppHeader;