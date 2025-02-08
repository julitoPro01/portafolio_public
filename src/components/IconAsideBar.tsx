
export interface Items {
    href: string,
    title: string
    icon: string
}


interface IconsProps {
    onGetPosition: () => void,
    value: Items, i: number
}

export const IconAsideBar = ({ Props, handleChengePage}: { Props: IconsProps,handleChengePage:(href:string)=>void }) => {

    const { value, onGetPosition, i } = Props;

   


    return (
        <li key={value.href} >
            <a className="bg-primary" href={`#${value.href}`}
                onClick={() => {
                    onGetPosition()
                    handleChengePage(value.href)
                    }}>
                <p className={`fs-3 my-1 ${i == 0 && 'active'}`}>

                    <i className={`${value.icon} pt-1`}></i>
                </p>
            </a>

        </li>
    )
}

