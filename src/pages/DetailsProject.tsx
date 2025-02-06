import { memo, useContext, useEffect, useState } from "react"
import { DataContext } from "../context/UserDataContext"
import { StateDataProject } from "../context/UserDataType";

export const DetailsProject = memo(({ handleCloseContent }: { handleCloseContent: () => void }) => {

    const { state } = useContext(DataContext);
    const [values, setvalues] = useState<StateDataProject>();
    const [details, setdetails] = useState([]);

    useEffect(() => {
        if (!state.stateProject.length) return;
        if(!state.stateCordOfProyect.item) return
        const details: [] = JSON.parse(state.stateProject[state.stateCordOfProyect.item - 1].details);
        setvalues(state.stateProject[state.stateCordOfProyect.item - 1]);
        setdetails(details)

    }, [state.stateCordOfProyect.item])


    return (
        <>
            <div className="__close">
                <div className="w-100 d-flex align-items-center">
                    {
                        values?.urlgit &&
                        <a href={values?.urlgit} target="_blank" className="mx-2 text-light" ><i className="bi bi-github"></i></a>
                    }
                    {
                        values?.urlweb &&
                        <a href={values?.urlweb} target="_blank" className="mx-2 text-light" ><i className="bi bi-globe-americas"></i></a>
                    }
                </div>
                <p className="P_close text-light fs-2 m-2 px-2 "
                    onClick={handleCloseContent} ><i className="bi bi-x-lg"></i>  </p>

            </div>
            <div className="m-0 mb-4 content_DetailsProject ">

                <p className="text-light fs-5 fw-bolder px-2" >
                    {values?.name}
                </p>

                <p className="text-light rounded px-3 " >
                    {values?.description}
                </p>
                {
                    !!details.length &&
                    details.map((detail: any, i: number) => (
                        <div key={i} className="m-2" >
                            <div className=' w-100'>
                                {detail.img && <img src={detail.img} className=" w-100" alt="..."
                                    style={{ objectFit: 'contain', maxHeight: '600px' }}
                                />}
                            </div>
                            <div className=" w-100 ">
                                <p className="fs-5 fw-semibold px-2">{detail?.subtopic}</p>
                                {detail.description &&

                                    <p className=" text-light rounded px-2 fs-6 w-100">{detail.description}</p>
                                }
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
})

