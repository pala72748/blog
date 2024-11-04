import React from 'react'
import { Icon } from '@iconify/react';

const Input = ({ label, value, name, type, placeholder, onChange, className, icon }) => {
  return (
    <>
      <label htmlFor={name} className='my-2'>{label}</label>
      <div className='relative flex items-center'>
        <span className='absolute left-2 bg-green-400 p-1 rounded-full'><Icon icon={icon} fontSize={20} /></span>
        <input className={className} value={value} type={type} name={name} placeholder={placeholder} onChange={onChange} />
      </div>
    </>
  )
}

export default Input;