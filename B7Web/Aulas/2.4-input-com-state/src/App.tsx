import React, {useState} from 'react';

function App(){
  const [name,setName] = useState('');
  
  return(
    <div>
      Nome:
      <input type="text" value={name} onChange={handleInput} />
      <hr />
      Seu nome é: {name}
    </div>
  );

  function handleInput(event: React.ChangeEvent<HTMLInputElement>){
      setName(event.target.value);
  }

}

export default App;