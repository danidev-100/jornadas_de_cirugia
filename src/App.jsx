import { useEffect } from "react";
import { Container } from "./component/Container";
import Nav from "./component/Nav";
import Hero from "./component/Hero";
import Footer from "./component/Footer";
import Sponsors from "./component/Sponsors";
import Contact from "./component/Contact";
import Agenda from "./component/Agenda";
import Audience from "./component/Audience";
import Speakers from "./component/Speakers";
import Works from "./component/Works";
import RegistrationCost from "./component/RegistrationCost";
import Organization from "./component/Organization";
import FixedCode from "./component/Whatsapp";
import Accommodation from "./component/Accommodation";

function normalizeEncodedHashPath() {
  if (window.location.hash) {
    return;
  }

  const decodedPathname = decodeURIComponent(window.location.pathname);

  if (!decodedPathname.startsWith("/#")) {
    return;
  }

  const normalizedHash = decodedPathname.slice(1);
  const nextUrl = `${import.meta.env.BASE_URL}${window.location.search}${normalizedHash}`;

  window.history.replaceState(null, "", nextUrl);
}

function scrollToHashTarget() {
  normalizeEncodedHashPath();

  if (!window.location.hash) {
    return;
  }

  const targetId = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.scrollIntoView({ block: "start" });
}

const App = () => {
  useEffect(() => {
    let animationFrameId = 0;
    let fallbackTimeoutId = 0;

    const scheduleHashScroll = () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimeoutId);

      animationFrameId = window.requestAnimationFrame(() => {
        scrollToHashTarget();
      });

      // Re-run once after layout settles so deep links work on first load.
      fallbackTimeoutId = window.setTimeout(() => {
        scrollToHashTarget();
      }, 250);
    };

    scheduleHashScroll();
    window.addEventListener("load", scheduleHashScroll);
    window.addEventListener("hashchange", scheduleHashScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimeoutId);
      window.removeEventListener("load", scheduleHashScroll);
      window.removeEventListener("hashchange", scheduleHashScroll);
    };
  }, []);

  return (
    <div>
      <FixedCode className=""/>
      <Nav />
      <Hero />
      <Container className="bg-cloud">
        <Audience />
      </Container>
      <Container className="bg-white">
        <Agenda />
      </Container>
      <Container className="bg-deep-blue">
        <Speakers />
      </Container>
      <Container className="bg-cloud">
        <Works />
      </Container>
      <Container className="bg-white">
        <Sponsors />
      </Container>
      <Container className="bg-cloud">
        <Accommodation />
      </Container>
      <Container className="bg-sand">
        <RegistrationCost />
      </Container>
      <Container>
        <Organization />
      </Container>
      <Container className="bg-ocean-blue">
        <Contact />
      </Container>
      <Container className="bg-deep-blue">
        <Footer />
      </Container>
    </div>
  );
};

export default App;
