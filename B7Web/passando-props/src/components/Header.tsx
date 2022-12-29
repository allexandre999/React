type Props = {
  title?:string
}

function Header(props:Props){
    return (
      <header>
        <h1>{props.title}</h1>
        <hr />
      </header>
    );
  }

export default Header;