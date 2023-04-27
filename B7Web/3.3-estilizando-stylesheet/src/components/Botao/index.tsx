import {useState} from 'react';
import './Botao.css';

function Botao(){
    const [clicado,setClicado] = useState(false);
    
    return(
        <button onClick={handleClick} className = {clicado?'botaoClicadoo':'botaoNaoClicadoo'}>Botao:Cliqui Aqui</button>
    );

    function handleClick(){
        setClicado(!clicado)
    }
}

export default Botao;