function App() {
  function BotaoDeAlerta():void{
    alert("clicaram no botao");
  }

  return (
    <div>
        <button onClick={BotaoDeAlerta}>Clique aqui</button>
    </div>
   );
   
}

export default App;