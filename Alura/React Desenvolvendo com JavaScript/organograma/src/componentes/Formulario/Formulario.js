import './Formulario.css'

function Formulario()
{
    return(
        <div className='formulario'>
          <form>
                <label htmlFor='nome'>Nome:</label>
                <input type="text" placeholder="Digite seu nome" name="nome"/>
                <label htmlFor='cargo'>Cargo:</label>
                <input type="text" placeholder="Cargo" name="cargo"/>
                <label htmlFor=''>Imagem:</label>
                <input type="img" placeholder="Imagem" name="imagem"/>
          </form>
        </div>
    );
}

export default Formulario;