import {useState} from 'react';

export function Multiplicar(){
    const [numMulti1, modificarMulti1] = useState(0);
    const [numMulti2, modificarMulti2] = useState(0);
    const [resultado, modificarResultado] = useState(0);
    
    return(
        <div>
            <button onClick={diminuirNum1}>-</button><span>{numMulti1}</span><button onClick={aumentarNum1}>+</button><button onClick={zerarNum1}>Zerar</button><br />
            <button onClick={diminuirNum2}>-</button><span>{numMulti2}</span><button onClick={aumentarNum2}>+</button><button onClick={zerarNum2}>Zerar</button><br />
            <button onClick={multiplicar}>Multiplicar</button><span>Resultado: </span><span>{resultado}</span><button onClick={zerarResultado}>Zerar</button>
        </div>
    );

    function aumentarNum1(){
        modificarMulti1(numMulti1+1);
    }

    function aumentarNum2(){
        modificarMulti2(numMulti2+1);
    }

    function diminuirNum1(){
        modificarMulti1(numMulti1-1);
    }

    function diminuirNum2(){
        modificarMulti2(numMulti2-1);
    }

    function zerarNum1(){
        modificarMulti1(0);
    }

    function zerarNum2(){
        modificarMulti2(0);
    }

    function multiplicar(){
        modificarResultado(numMulti1 * numMulti2);
    }

    function zerarResultado(){
        modificarResultado(0);
    }


}