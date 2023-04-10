import { Somar } from './components/Somar';
import { Subtrair } from './components/Subtrair'

function App(){ 
  return(
    <div>
      <h1>Soma:</h1>
      <Somar/>
      <h1>Subtracao:</h1>
      <Subtrair></Subtrair>
      <h1>Multiplicacao:</h1>

      <h1>Divisao:</h1>
    </div>
  );

}

export default App;