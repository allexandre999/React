import { useState } from "react";
import './styles.css';
import Botao from "./components/Botao";


function App(){
  const [botaoClicado,setBotaoClicado] = useState(false);

  return(
    <div>
      <button className={botaoClicado?"clicado":'naoClicado'}  onClick={handleClick}>Clique em mim</button>
      <br /><Botao/>
    </div>
  );

  function handleClick(){
    setBotaoClicado(!botaoClicado);
  }
}

export default App;