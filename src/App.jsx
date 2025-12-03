import { Container } from "./component/Container";
import Nav from "./component/Nav";
import Hero from "./component/Hero";
import Footer from "./component/Footer";
import Sponsors from "./component/Sponsors";
import Registration from "./component/Registration";
import Agenda from "./component/Agenda";
import Audience from "./component/Audience";
import Speakers from "./component/Speakers";
import Works from "./component/Works";
import RegistrationCost from "./component/RegistrationCost";
import Organization from "./component/Organization";

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
      <Container className="bg-white">
        <Sponsors />
      </Container>
      <Container className="bg-sand">
        <RegistrationCost />
      </Container>
      <Container>
        <Organization />
      </Container>
      <Container className="bg-ocean-blue">
        <Registration />
      </Container>
      <Container className="bg-deep-blue">
        <Footer />
      </Container>
    </div>
  );
};

export default App;
