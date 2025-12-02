import clsx from "clsx";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Patrocinadores } from "./Patrocinadores";
import { Form } from "./Form";


export function Container({ className, ...props }) {
  return (
    <div>
      <div
        className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
        {...props}
      />
      <Header />
      <Main />
      <Patrocinadores/>
      <Form/>
      <Footer />
      
    </div>
  );
}
