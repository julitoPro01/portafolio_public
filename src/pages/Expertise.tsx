import { UidNodePage } from "./UidPageNode"

import iconReact from '../assets/icons/react96.png';
import iconNet from '../assets/icons/net-icon.png';
import iconKotlin from '../assets/icons/kotlin-icon.png';
import { SpaceHight } from "./component/Space";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/UserDataContext";

export const Expertise = () => {

    const { state } = useContext(DataContext)
    const [devSkill, setdevSkill] = useState<any[]>([])

    useEffect(() => {
      let items:any = [];
      state.stateDevSills.forEach((item:any,i)=>{
        if(i==0)
        item.img=iconReact;
        else if(i==1)
            item.img=iconNet;
        else if(i==2)
            item.img = iconKotlin

        items.push(item)
      })
        setdevSkill(items)
    
    }, [state])
    

    return (
        <div className="content__expersite" id={UidNodePage.expertise}>
            <SpaceHight />
            <div>

                <div className="container-md  content__body" >
                    <div className="row  ms-sm-0 ms-5 pt-0 pt-md-5 mt-md-5 mt-0 ps-sm-0 ps-2  content__child ">

                        {
                            devSkill &&
                            devSkill.map(item => (
                                <div className="row col-12 col-lg-4 col-md-6 col-sm-10  p-2 m-0  child__web"
                                 key={item.name}>
                                    <div className="child_icon p-0" >
                                        <img className="w-100" src={item.img } alt="react" />
                                    </div>
                                    <div className="col-7 child_title">
                                        <p className="fs-2 p-0 m-0"><span> {item.name} </span> <br />{item.subname}</p>
                                    </div>
                                    <div className="col-12 d-flex m-0  child_p">
                                        <div>
                                            <p>{"<h2>"}</p> <br />
                                            <p>{"</h2>"}</p>
                                        </div>
                                        <p className="m-0" >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            <SpaceHight />

        </div>
    )
}


