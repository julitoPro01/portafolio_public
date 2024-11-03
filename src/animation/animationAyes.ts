
interface Props {
    nodeEye:HTMLDivElement
}

export const animationAyes = ({ nodeEye }: Props) => {



    const handleMove_eye = (e: any) => {
        e.preventDefault;
        if(!nodeEye) return
        const windowX = window.innerWidth;
        const windowY = window.innerHeight/4;
            const x = (e.clientX/windowX)*70-20;
            const y = (e.clientY/windowY)*50-25;
        nodeEye.style.left =x+'px';
        if(y>8 && y<27){
            nodeEye.style.top =y+'px';
        }else if(y>27){
            nodeEye.style.top =26+'px';
        }

    };


    return{
        handleMove_eye,

    }

}
