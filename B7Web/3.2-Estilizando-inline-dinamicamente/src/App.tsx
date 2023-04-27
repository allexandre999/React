import {useState} from 'react';


function App()
{
  const [clicado,setClicado] = useState(false);

  return(
    <div>
      <button 
      onClick={handleClick} 
      style={{
        backgroundColor: clicado ?'black':'red',
        color:clicado?'green':'white',
        border:'0',
        padding:clicado?'40px':'10px'}}
        >Clique em Mim</button>
    </div>
  );

  function handleClick(){
    setClicado(!clicado);
  }
}

export default App;