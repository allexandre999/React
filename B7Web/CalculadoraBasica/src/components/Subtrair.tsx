import {useState} from 'react';
export function Subtrair(){
    const[numbersub1, modificarNumber1] = useState(0);
    const[numberSub2, modificarNumber2] = useState(0);
    const[resultado, modificarResultado] = useState(0);
    
    return(
        <div>

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

    


}