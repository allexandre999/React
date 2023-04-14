import React from 'react';
import { useState } from 'react';

function App(){
  const [altura,setAltura] = useState(0);
  const [peso,setPeso] = useState(0);
  const [imc,setImc] = useState(0);
  const [statusImc,setStatusImc] = useState('');

  return(
    <div>
      <span>Insira sua altura'(cm)'</span><input type="text" onChange={getAltura}/>
      <hr /><br />
      <span>Insira seu peso'(kg)'</span><input type="text" onChange={getPeso}/>
      <hr /><br />
      <button onClick={calcularIMC}>Calcular IMC</button><br />
      <span>Seu IMC é: </span><span>{Number(imc)}</span><br />
      <span>Seu Peso é: </span><span>{Number(peso)}</span><span> kg</span><br />
      <span>Sua Altura é: </span><span>{Number(altura)}</span><span> cm</span><br />
      <span>{statusImc}</span><br />
    </div>
  );
  
  function getAltura(event: React.ChangeEvent<HTMLInputElement>){
    setAltura(Number(event.target.value));
  }

  function getPeso(event: React.ChangeEvent<HTMLInputElement>){
    setPeso(Number(event.target.value));
  }
  
  function calcularIMC(){
    setImc(Number(Number(peso)/Number((altura*altura)/10000)));
    calcularStatusIMC(imc);
  }

  function calcularStatusIMC(imc:number){
    if(imc<18.5)
      return setStatusImc("Você está com Baixo Peso");
    else 
      if (imc <= 24.9)
       return setStatusImc("Você está com Peso saudável");
      else
        if(imc <= 29.9)
          return setStatusImc("Você está com Sobrepeso");
        else
          return setStatusImc("Você está com Obesidade"); 
  }

}

export default App;