
export interface Items {
    href: string,
    title: string
    icon: string
}


interface IconsProps {
    onGetPosition: () => void,
    value: Items, i: number
}

export const IconAsideBar = ({ Props}: { Props: IconsProps}) => {

    const { value, onGetPosition, i } = Props;

   const handleChengePage =()=>{
        const path = window.location.origin+`/#${value.href}`
       window.location.replace(window.location.origin+`/#${value.href}`);

       localStorage.setItem("path",path)
   }


    return (
        <li key={value.href} >
            <div className="" data-href={`#${value.href}`}
                onClick={() => {
                    onGetPosition()
                    handleChengePage()
                    }}>
                <p className={`fs-3 my-1 ${i == 0 && 'active'}`}>

                    <i className={`${value.icon} pt-1`}></i>
                </p>
            </div>

        </li>
    )
}

