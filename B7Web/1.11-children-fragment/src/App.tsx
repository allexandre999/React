import Photo from "./components/Photo";

function App(){
  return (
    
    <div>
      Ola Mundo

      <Photo caminhoImg = "http://www.google.com.br/google.jpg" legend = "Google">
        <img src="http://www.google.com.br/google.jpg" alt="" />
        <hr />
      </Photo>
    </div>
  );
}

export default App;