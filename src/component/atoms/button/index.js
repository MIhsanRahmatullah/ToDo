import React from "react";

const Button = ({title, onClick, loading}) => {
    if(loading){
        return <button className="buttonLoading">Loading...</button>
    }
    return (
        <button className="buttonRegister" onClick={onClick}>{title}</button>
    )
}

export default Button;