import React from 'react'

const Field = ({name, label, value, onChange, placeholder = "", type = "text"}) => (
        <>
        <div className="container">
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input 
                    type={type}
                    placeholder={placeholder || label} 
                    name={name} 
                    id={name} 
                    className="form-control"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
        </>
    )
 
export default Field;