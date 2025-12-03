import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';

import logoNav from "../assets/logo-nav.png";

const navigation = [
  { name: "Inicio", href: "#inicio", current: true },
  { name: "Público", href: "#publico", current: false },
  { name: "Programa", href: "#programa", current: false },
  { name: "Disertantes", href: "#disertante", current: false },
  { name: "Trabajos cientificos", href: "#Trabajos cientificos", current: false },
  { name: "Patrocinadores", href: "#patrocinadores", current: false },
  { name: "Organizacion", href: "#organizacion", current: false },
  { name: "Contacto", href: "#contacto", current: false },
];

function Header() {
  return (
    <Disclosure as="nav" className="relative">
      <div className="mx-auto max-w-7xl px-2 md:px-6 md:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <div className="flex shrink-0 items-center md:hidden lg:flex">
              <img
                alt="Jornadas de Cirugia"
                src={logoNav}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:ml-6 md:block">
              <div className="flex gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={clsx(
                      item.current ? 'bg-ocean-blue text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'rounded-full px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={clsx(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

    // <header className=" bg-white/90 backdrop-blur border-b ">
    //   <div className=" bg-titleColor flex w-full  text-amber-50 justify-between px-6 py-4">
    //     <a
    //       href="#inicio"
    //       className="text-lg font-semibold tracking-wide text-white "
    //     >
    //     <h1 className="">Jornadas de Cirugia</h1>
    //     </a>
    //     <nav
    //       aria-label="Secciones principales"
    //       className="md:flex items-center hidden gap-4 "
    //     >
    //       {menuLinks.map((item) => (
    //         <a
    //           key={item.href}
    //           href={item.href}
    //           className="rounded-full px-4 py-2 transition hover:bg-disertante"
    //         >
    //           {item.label}
    //         </a>
    //       ))}
    //     </nav>
    //   </div>
    // </header>
  // );
// }

export default Header;
