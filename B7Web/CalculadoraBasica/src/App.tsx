import { Somar } from './components/Somar';
import { Subtrair } from './components/Subtrair'
import { Multiplicar } from './components/Multiplicar'
import { Dividir } from './components/Dividir'

function App(){ 
  return(
    <div>
      <h1>Soma:</h1>
      <Somar/>
      <h1>Subtracao:</h1>
      <Subtrair></Subtrair>
      <h1>Multiplicacao:</h1>
      <Multiplicar></Multiplicar>
      <h1>Divisao:</h1>
      <Dividir></Dividir>
    </div>
  );

}

export default App;