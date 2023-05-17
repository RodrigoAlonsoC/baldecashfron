import { Popover } from '@headlessui/react'
import {
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Header({ nameUserLogged }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://uploads-ssl.webflow.com/62141f21700a64ab3f816206/62698bca9d9282dbef03c393_Logo-BaldeCash-Horizontal%202%20(5).png" alt="" />
          
          </a>
          <h1>Bienvenido {nameUserLogged}</h1>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </a>
        
         
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/logout" className="text-sm font-semibold leading-6 text-gray-900">
            Salir <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
     
    </header>
  )
}