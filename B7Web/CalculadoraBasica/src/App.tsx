import {useState} from 'react';
import {Somar} from './components/Somar'

function App(){
  const [numberSoma1,adicionarNumero1] = useState(0);
  const [numberSoma2,adicionarNumero2] = useState(0);
  const [numberSubtracao1,subtrairNumero1] = useState(0);
  const [numberSubtracao2,subtrarirNumero2] = useState(0);
  const [numberMultiplicacao1,multiplicarNumero1] = useState(0);
  const [numberMultiplicacao2,multiplicarNumero2] = useState(0);
  const [numberDivisao1,dividirNumero1] = useState(0);
  const [numberDivisao2,dividirNumero2] = useState(0);
  
  
  return(
    <div>
      <h1>Soma:</h1>

      <h1>Subtracao:</h1>

      <h1>Multiplicacao:</h1>


      <h1>Divisao:</h1>


    </div>
  );

}

export default App;