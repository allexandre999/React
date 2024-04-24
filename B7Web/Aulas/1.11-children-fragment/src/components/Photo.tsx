import {ReactNode} from "react";

type Props = {
caminhoImg:string
legend:string
children: ReactNode;
}

function Photo({caminhoImg,legend,children} : Props){
    return (
        <div>
            {children}
            <img src={caminhoImg} alt="" title={legend}/>
            <p>{legend}</p>
        </div>
    );
}

export default Photo;