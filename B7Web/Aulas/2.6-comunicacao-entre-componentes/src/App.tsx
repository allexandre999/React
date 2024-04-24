import {Botao} from './components/Botao'

function App()
{
  let mensagemBotao = 'Clicar no botão'

  return(
    <div>
      teste
      <Botao text={mensagemBotao} clickFn={eventoBotaoAcao}/>
    </div>
  );


  function eventoBotaoAcao()
  {
    alert('Frase do App');
  }
}

export default App;