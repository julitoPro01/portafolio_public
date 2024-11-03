
export interface Items {
    href: string,
    title: string
    icon: string
}


interface IconsProps {
    onGetPosition: () => void,
    value: Items, i: number
}

export const IconAsideBar = ({ Props }: { Props: IconsProps }) => {

    const { value, onGetPosition, i } = Props;
    return (
            <li key={value.href} >
                <a className="bg-primary" href={`#${value.href}`} onClick={() => onGetPosition()}>
                    <p className={`fs-3 m-1 ${i == 0 && 'active'}`}>
                       
                        <i className={`${value.icon} pt-1`}></i>
                    </p>
                </a>
            </li>
    )
}

