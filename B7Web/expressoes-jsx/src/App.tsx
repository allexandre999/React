function App(){
  let number1:number = 10;
  let number2:number = 7;
  let firstNAme:string = "Joao";
  let secondName:string = "Alexandre";
  let linkDoGoogle:string = 'https://gogole.com';


  return (
    <div>
      Soma: {Soma(number1,number2)} <br />
      Subrtação: {Subtracao(number1,number2)} <br />
      Multiplicação: {Multiplicação(number1,number2)} <br />
      Divisão: {Divisao(number1,number2)} <br />
      Nome: {ConcatenarNome(firstNAme,secondName)} <br />
      Quer ir para o Google: <a href={linkDoGoogle} target="_blank" >Clique aqui</a> <br />
    </div>
  );

    function Soma(n1:number,n2:number) : number{
      return n1+n2;
    }

    function Subtracao(n1:number,n2:number) : number{
      return n1-n2;
    }

    function Multiplicação(n3:number,n4:number) : number{
      return n3*n4;
    }

    function Divisao(n3:number,n4:number) : number{
      return n3/n4
    }

    function ConcatenarNome(name1:string,name2:string):string {
      return name1.toLocaleUpperCase()+" "+name2; 
    }

}

export default App;
