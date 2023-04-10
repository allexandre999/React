import {useState} from 'react';

export function Subtrair(){
    const[numbersub1, modificarNumber1] = useState(0);
    const[numberSub2, modificarNumber2] = useState(0);
    const[resultado, modificarResultado] = useState(0);
    
    return(
        <div>
            <button onClick={diminuirNum1}>-</button><span>{numbersub1}</span><button onClick={adicionarNum1}>+</button><button onClick={zerarNum1}>Zerar</button><br />
            <button onClick={diminuirNum2}>-</button><span>{numberSub2}</span><button onClick={adicionarNum2}>+</button><button onClick={zerarNum2}>Zerar</button><br />
            <button onClick={subtrair}>Subtrair</button><span>Resultado: </span><span>{resultado}</span><button onClick={zerarResultado}>Zerar</button>
        </div>
    );

    function adicionarNum1(){
        modificarNumber1(numbersub1 + 1);
    }

    function adicionarNum2(){
        modificarNumber2(numberSub2 + 1);
    }
    
    function diminuirNum1(){
        modificarNumber1(numbersub1 - 1);
    }

    function diminuirNum2(){
        modificarNumber2(numberSub2 - 1);
    }

    function zerarNum1(){
        modificarNumber1(0);
    }

    function zerarNum2(){
        modificarNumber2(0);
    }

    function zerarResultado(){
        modificarResultado(0);
    }

    function subtrair(){
        modificarResultado(numbersub1-numberSub2);
    }
}