import { memo, useEffect, useState } from "react"
import { StateDataProject } from '../context/UserDataType';
import { FaGithub } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";

export const DetailsProject = memo(({ value }: { value: StateDataProject }) => {

    const [details, setdetails] = useState<{
        description?: string,
        sub_description: string,
        sections: { tool: string, description: string }[],
        images: string[]
    }>()
    useEffect(() => {

        if (!value.details) return;
        const detail = JSON.parse(value.details)
        setdetails(detail)

    }, [value])


    return (
        <>
            <div className=" content_DetailsProject ">
                <div className="img_panoram mb-4 m-0" >
                    <img src={value?.img} className="w-100" alt="" />
                </div>
                <p className=" fs-5 fw-bolder px-2" >
                    {value?.name}
                </p>

                <p className=" rounded px-3 " >
                    {value?.description}
                </p>

                <div className="m-2">
                    <p>
                        {details?.description}
                    </p>
                    <p className="fw-bolder">{details?.sub_description}</p>
                    {
                        details?.sections.map(val => (
                            <div key={val.tool}>
                                <p className="px-2 rounded _subtitle">{val.tool}</p>
                                <p>{val.description}</p>
                            </div>
                        ))
                    }
                </div>

                <div className="text-end">

                {
                    value?.urlweb &&
                    <a href={value.urlweb} target="_blank" className="btn">
                          <BsGlobe2 size={"2rem"} /> Ver Live
                    </a>
                }
                {
                    value?.urlgit &&
                    <a href={value.urlgit} target="_blank" className="btn ">
                        <FaGithub size={"2rem"} /> Repositorio
                    </a>
                }

                </div>



                {
                    details?.images.map((val, i) => (
                        <div key={i} className=" mb-4" >
                            <img src={val} className="w-100 rounded" alt="" />
                        </div>
                    ))

                }

                <div>
                </div>
            </div>
        </>
    )
})

