type Props =
{
  text: string;
  clickFn: () => void;
}


export function Botao({text,clickFn}: Props)
{
    return(
      <div>
        <button onClick={clickFn}>{text}</button>
      </div>
    );


    function handleClick(){
      alert('clicou');
    }
}

