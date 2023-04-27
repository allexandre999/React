import {Container} from './AppStyles';
import { useState } from "react";
import {Botao} from './AppStyles'

function App(){
  return(
    <div>
      <Container>
        Texto do componente 
      </Container>
      <Botao>Clique</Botao>
    </div>
  
  );
}

export default App;