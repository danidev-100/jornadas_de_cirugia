import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import logoNav from "../assets/logo-nav.png";

 const navigation = [
  { name: "Inicio", href: "#inicio", current: true },
  { name: "Público", href: "#publico", current: false },
  { name: "Programa", href: "#programa", current: false },
  { name: "Disertantes", href: "#disertantes", current: false },
  { name: "Trabajos científicos", href: "#trabajos", current: false },
  { name: "Inscripciones", href: "#inscripciones", current: false },
  { name: "Patrocinadores", href: "#patrocinadores", current: false },
  { name: "Organización", href: "#organizacion", current: false },
  { name: "Contacto", href: "#contacto", current: false },
]




function Nav() {
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-deep-blue shadow-lg/20">
      <div className="px-2 lg:px-8">
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            { /* Mobile menu button */ }
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-lagoon">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex shrink-0 items-center lg:hidden xl:flex">
              <img
                alt="Jornadas de Cirugia"
                src={logoNav}
                className="h-7 w-auto mb-1"
              />
            </div>
            <div className="hidden md:ml-6 lg:block">
              <div className="flex gap-2 md:gap-0 lg:gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={clsx(
                      item.current ? 'bg-lagoon' : 'hover:bg-white/5 hover:text-white',
                      'text-white rounded-3xl px-2 py-2 text-base font-medium whitespace-nowrap',
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

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={clsx(
                item.current ? 'bg-lagoon' : 'hover:bg-white/5 hover:text-white',
                'text-white block rounded-3xl px-3 py-2 text-base font-medium whitespace-nowrap',
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

export default Nav;
