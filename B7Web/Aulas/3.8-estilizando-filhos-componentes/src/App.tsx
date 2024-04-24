import {Botao,Container} from './AppStyles';

function App(){
  return(
    <div>
      <Container bgColor='Blue' color='red' largura='100' altura='100'>
        <span>eu sou um container</span><br />
        <a href="https://google.com.br" className='linkGoogle'>Link para google</a>
        </Container>
      <Botao bg='yellow' >Botao grande</Botao>
      <Botao bg='green' small>Botao pequeno</Botao>
    </div>
  );
}

export default App;