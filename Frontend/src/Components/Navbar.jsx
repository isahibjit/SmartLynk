import React from 'react'
import logo from "/logo.png"
const Navbar = () => {
  return (
      <header className="flex items-center justify-start gap-4 whitespace-nowrap border-b border-slate-200 px-6 sm:px-10 py-4">
            <div className="flex items-center gap-3 text-slate-900">
              <img src={logo} alt="logo" className='w-[150px] ' />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-500 cursor-pointer">
               AI That Talks Your Talk
              </h1>
            </div>
          </header>
  )
}

export default Navbar