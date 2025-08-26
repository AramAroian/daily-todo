import React from "react";
import "./Header.css";
import logo from '../../assets/logo.svg'

export default function Header(): React.JSX.Element {
    return (
        <header className="header">
            <img src={logo} alt="" />
        </header>
    )
}