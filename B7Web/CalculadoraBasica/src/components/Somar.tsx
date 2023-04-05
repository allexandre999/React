import {useState} from 'react';

export function Somar(){

    const [numberSoma1,modificarNumero1] = useState(0);
    const [numberSoma2,modificarNumero2] = useState(0);
    const [resultado,modificarResultado] = useState(0);
        
    return (
        <div>
           <button onClick={diminuirNum1}>-</button><span>{numberSoma1}</span><button onClick={adicionarNum1}>+</button><button onClick={zerarNum1}>Zerar</button><br />
           <button onClick={diminuirNum2}>-</button><span>{numberSoma2}</span><button onClick={adicionarNum2}>+</button><button onClick={zerarNum2}>Zerar</button><br />
           <button onClick={Somar}>Somar</button>
           <span>Resultado: </span><span>{resultado}</span><button onClick={zerarResultado}>Zerar</button>
             
        </div>
    );

    function adicionarNum1(){
        modificarNumero1(numberSoma1+1);
    }
    
    function adicionarNum2(){
        modificarNumero2(numberSoma2+1);
    }

    function diminuirNum1(){
        modificarNumero1(numberSoma1-1);
    }
    
    function diminuirNum2(){
        modificarNumero2(numberSoma2-1);
    }

    function zerarNum1(){
        modificarNumero1(0);
    }

    function zerarNum2(){
        modificarNumero2(0);    
    }

    function zerarResultado(){
        modificarResultado(0);
    }

    function Somar(){
        modificarResultado(numberSoma1 + numberSoma2);
    }

}
