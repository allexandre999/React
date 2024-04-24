import {Botao,Container} from './AppStyles';

function App(){
  return(
    <div>
      <Container bgColor='Blue' color='red' largura='100' altura='100'>eu sou um container</Container>
      <Botao bg='yellow' >Botao grande</Botao>
      <Botao bg='green' small>Botao pequeno</Botao>
    </div>
  );
}

export default App;