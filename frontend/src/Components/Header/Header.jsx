import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const navbar = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Service", link: "/service" },
    { name: "Product", link: "/product" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
  ]
  return (
    <>
      <div className='container mx-auto h-[10vh] border' >
        <div className='flex flex-row items-center h-full'>
          <div className='w-3/12'>
            <h1 className='text-2xl font-medium'>Logo</h1>
          </div>
          <div className=''>
            <ul className='flex flex-row gap-4'>
              {
                navbar.map((items, index) => {
                  return (
                    <li key={index}><Link to={items.link}>{items.name}</Link></li>
              )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;