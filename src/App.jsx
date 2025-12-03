import { Container } from "./component/Container";
import Header from "./component/Header";
import Main from "./component/Main";
import Footer from "./component/Footer";
import { Patrocinadores } from "./component/Patrocinadores";
import { Form } from "./component/Form";

const App = () => {
  return (
    <div>
      <Container className="sticky bg-titleColor shadow-lg/20">
        <Header />
      </Container>
      <Container>
        <Main />
      </Container>
      <Container>
        <Patrocinadores />
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
