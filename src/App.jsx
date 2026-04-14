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
import SubmissionGuidelines from "./component/SubmissionGuidelines";
import RegistrationCost from "./component/RegistrationCost";
import Organization from "./component/Organization";
import FixedCode from "./component/Whatsapp";
import Accommodation from "./component/Accommodation";

function decodeRepeatedly(value, maxIterations = 4) {
  let decodedValue = value;

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    try {
      const nextValue = decodeURIComponent(decodedValue);

      if (nextValue === decodedValue) {
        break;
      }

      decodedValue = nextValue;
    } catch {
      break;
    }
  }

  return decodedValue;
}

function normalizeSectionId(value) {
  return decodeRepeatedly(value)
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^#+/, "");
}

function getSectionIdFromLocation() {
  const sectionParam = new URLSearchParams(window.location.search).get("section");
  const candidates = [window.location.hash, window.location.pathname, sectionParam];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const sectionId = normalizeSectionId(candidate);

    if (sectionId && document.getElementById(sectionId)) {
      return sectionId;
    }
  }

  return null;
}

function normalizeEncodedHashPath() {
  const sectionId = getSectionIdFromLocation();

  if (!sectionId) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  params.delete("section");

  const nextSearch = params.toString();
  const normalizedHash = `#${sectionId}`;
  const nextUrl = `${import.meta.env.BASE_URL}${nextSearch ? `?${nextSearch}` : ""}${normalizedHash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (currentUrl === nextUrl) {
    return;
  }

  window.history.replaceState(null, "", nextUrl);
}

function scrollToHashTarget() {
  normalizeEncodedHashPath();
  const targetId = getSectionIdFromLocation();

  if (!targetId) {
    return;
  }

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
        <SubmissionGuidelines />
      </Container>
      <Container className="bg-sand">
        <RegistrationCost />
      </Container>
      <Container className="bg-white">
        <Sponsors />
      </Container>
      <Container className="bg-cloud">
        <Accommodation />
      </Container>
      <Container className="bg-white">
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
