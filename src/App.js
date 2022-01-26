import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";
import GlobalStyle from './styles/global';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Rotas/>
    </BrowserRouter>
  );
}
