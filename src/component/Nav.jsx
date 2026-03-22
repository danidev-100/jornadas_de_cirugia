import { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import logoNav from "../assets/logo-nav.png";
import navigation from "../data/navigation";

const SECTION_SCROLL_OFFSET = 144;
const SECTION_IDS = navigation.map((item) =>
  decodeURIComponent(item.href.replace(/^#/, "")),
);

function getHashSectionId() {
  if (typeof window === "undefined" || !window.location.hash) {
    return null;
  }

  const hashId = decodeURIComponent(window.location.hash.slice(1));

  if (!hashId) {
    return null;
  }

  if (SECTION_IDS.includes(hashId)) {
    return hashId;
  }

  let currentElement = document.getElementById(hashId);

  while (currentElement) {
    if (SECTION_IDS.includes(currentElement.id)) {
      return currentElement.id;
    }

    currentElement = currentElement.parentElement;
  }

  return null;
}

function getVisibleSectionId() {
  if (typeof window === "undefined") {
    return null;
  }

  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
    Boolean,
  );

  if (!sections.length) {
    return null;
  }

  const isAtPageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (isAtPageBottom) {
    return sections.at(-1)?.id ?? null;
  }

  const marker = SECTION_SCROLL_OFFSET + 1;
  let activeSectionId = sections[0].id;

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) {
      activeSectionId = section.id;
      continue;
    }

    break;
  }

  return activeSectionId;
}

function Nav() {
  const [activeSection, setActiveSection] = useState(
    () => getHashSectionId() ?? SECTION_IDS[0] ?? "",
  );

  useEffect(() => {
    let animationFrameId = 0;
    let timeoutId = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = window.requestAnimationFrame(() => {
        const nextActiveSection =
          getVisibleSectionId() ?? getHashSectionId() ?? SECTION_IDS[0] ?? "";

        setActiveSection((currentSection) =>
          currentSection === nextActiveSection
            ? currentSection
            : nextActiveSection,
        );
      });
    };

    updateActiveSection();
    timeoutId = window.setTimeout(updateActiveSection, 300);

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-deep-blue shadow-lg/20">
      <div className="px-2 lg:px-8">
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-lagoon">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-around">
            <div className="flex shrink-0 items-center lg:hidden xl:flex">
              <img
                alt="Jornadas de Cirugia"
                src={logoNav}
                className="h-7 w-auto mb-1"
              />
            </div>
            <div className="hidden md:ml-6 lg:block">
              <div className="flex gap-2 md:gap-0 lg:gap-2">
                {navigation.map((item) => {
                  const isActive =
                    item.href === `#${activeSection}`;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={clsx(
                        (item.name === "Público" ||
                          item.name === "Organización") &&
                          "hidden 2xl:inline-block",
                        isActive
                          ? "bg-lagoon shadow-sm"
                          : "hover:bg-white/5 hover:text-white",
                        "whitespace-nowrap rounded-3xl px-2 py-2 text-base font-medium text-white transition-all duration-300 ease-out",
                      )}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive = item.href === `#${activeSection}`;

            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  isActive
                    ? "bg-lagoon shadow-sm"
                    : "hover:bg-white/5 hover:text-white",
                  "block whitespace-nowrap rounded-3xl px-3 py-2 text-base font-medium text-white transition-all duration-300 ease-out",
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Nav;
