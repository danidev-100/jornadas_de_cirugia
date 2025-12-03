import { Container } from "./component/Container";
import Nav from "./component/Nav";
import Hero from "./component/Hero";
import Footer from "./component/Footer";
import Sponsors from "./component/Sponsors";
import Form from "./component/Form";
import Registration from "./component/Registration";
import Agenda from "./component/Agenda";
import Audience from "./component/Audience";
import Speakers from "./component/Speakers";
import Works from "./component/Works";

const App = () => {
  return (
    <div>
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
      <Container className="bg-sand">
        <Registration />
      </Container>
      <Container className="bg-white">
        <Sponsors />
      </Container>
      <Container>
        <Form />
        <Footer />
        <footer className=" py-8 text-center text-xs text-[#A9C8C0]">
          © 2025 Jornadas Argentinas de Cirugia · Asociacion Mendocina de
          Cirugia · Mendoza
        </footer>
      </Container>
    </div>
  );
};

export default App;
