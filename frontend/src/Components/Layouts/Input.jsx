import React from 'react'
import { Icon } from '@iconify/react';

const Input = ({ label, value, name, type, placeholder, onChange, className, icon }) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <label htmlFor={name} >{label}</label>
        <div className='relative flex items-center'>
          <span className='absolute top-1/2 left-2 -translate-y-1/2 p-1 rounded-full'><Icon icon={icon} fontSize={20} /></span>
          <input className={className} value={value} type={type} name={name} placeholder={placeholder} onChange={onChange} />
        </div>
      </div>
    </>
  )
}

export default Input;