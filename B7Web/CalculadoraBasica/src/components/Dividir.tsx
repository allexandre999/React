import {useState} from 'react';

export function Dividir(){
    const [numSub1,modificarSub1] = useState(0);
    const [numSub2,modificarSub2] = useState(0);
    const [resultado, modificarResultado] = useState(0);
    
    return(
        <div>
            <button onClick={diminuirSub1}>-</button><span>{numSub1}</span><button onClick={aumentarSub1}>+</button><button onClick={zerarSub1}>Zerar</button><br />
            <button onClick={diminuirSub2}>-</button><span>{numSub2}</span><button onClick={aumentarSub2}>+</button><button onClick={zerarSub2}>Zerar</button><br />
            <button onClick={dividir}>Dividir</button><span>Resultado: </span><span>{resultado}</span><button onClick={zerarResultado}>Zerar</button>
        </div>
    );

    function aumentarSub1(){
        modificarSub1(numSub1+1);
    }

    function aumentarSub2(){
        modificarSub2(numSub2+1);
    }

    function diminuirSub1(){
        modificarSub1(numSub1-1);
    }

    function diminuirSub2(){
        modificarSub2(numSub2-1);
    }

    function zerarSub1(){
        modificarSub1(0);
    }

    function zerarSub2(){
        modificarSub2(0);
    }

    function dividir(){
        modificarResultado(numSub1/numSub2);
    }

    function zerarResultado(){
        modificarResultado(0);
    }

}