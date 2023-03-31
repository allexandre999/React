import {useState} from 'react';

function Somar(){
    const [numberSoma1,modificarNumero1] = useState(0);
    const [numberSoma2,modificarNumero2] = useState(0);
    
    
    return (
        <div>
            
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

}

export default Somar;