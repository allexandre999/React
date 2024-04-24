import {useState} from 'react';

function App(){
  const [numero, modificarNumero] = useState(0);
  const [nome, modificarNome] = useState("João")
  
  return(
    <div>
        <p>Meu nome é {nome}</p>
        <button onClick={mudarNome}>Clique para modificar Nome</button><br />

        <button onClick={AumentarContador}>Aumentar</button><br /><hr />
        <p>{numero}</p><br /><hr />
        <button onClick={DiminuirContador}>Diminuir</button><br />
        <button onClick={zerarContador}>Zerar Contador</button>
    </div>
  );

    function AumentarContador(){
      modificarNumero(
        numero+1
      );
    }

    function DiminuirContador(){
      modificarNumero(
        numero-1
      );
    }

    function zerarContador(){
      modificarNumero(0);
    }

    function mudarNome(){
      modificarNome(
        "André"
      );
    }

}

export default App;