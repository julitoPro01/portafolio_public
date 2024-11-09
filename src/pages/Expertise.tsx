import { UidNodePage } from "./UidPageNode"

import iconReact from '../assets/icons/react96.png';
import { SpaceHight } from "./component/Space";

export const Expertise = () => {
    return (
        <div className="content__expersite" id={UidNodePage.expertise}>
            <SpaceHight />
            <div>

                <div className="container-md  content__body" >
                    <div className="row  ms-sm-0 ms-5 ps-sm-0 ps-2  content__child ">

                        <div className="row col-12 col-lg-4 col-md-6 col-sm-10  p-2 m-0  child__web">
                            <div className="child_icon p-0" >
                                <img className="w-100" src={iconReact} alt="react" />
                            </div>
                            <div className="col-7 child_title">
                                <p className="fs-2 p-0 m-0"><span> Frontend Dev</span> <br />React</p>
                            </div>
                            <div className="col-12 d-flex m-0  child_p">
                                <div>
                                    <p>{"<h2>"}</p> <br />
                                    <p>{"</h2>"}</p>
                                </div>
                                <p className="m-0" >
                                    Passionate about UI/UX. Over 5 years of development experience in HTML,
                                    CSS, JS, React and NextJS frameworks.
                                </p>
                            </div>
                        </div>

                        <div className="row col-12 col-lg-4 col-md-6 col-sm-10  p-2 m-0  child__web">
                            <div className="child_icon p-0" >
                                <img className="w-100" src={iconReact} alt="react" />
                            </div>
                            <div className="col-7 child_title">
                                <p className="fs-2 p-0 m-0"><span> Frontend Dev</span> <br />React</p>
                            </div>
                            <div className="col-12 d-flex m-0  child_p">
                                <div>
                                    <p>{"<h2>"}</p> <br />
                                    <p>{"</h2>"}</p>
                                </div>
                                <p className="m-0" >
                                    Passionate about UI/UX. Over 5 years of development experience in HTML,
                                    CSS, JS, React and NextJS frameworks.
                                </p>
                            </div>
                        </div>

                        <div className="row col-12 col-lg-4 col-md-12 col-sm-10 p-2 m-0 child__web">
                            <div className=" col-5 child_icon p-0" >
                                <img className="w-100" src={iconReact} alt="react" />
                            </div>
                            <div className="col-9 child_title">
                                <p className="fs-2 p-0 m-0"> <span> Frontend Dev</span> <br /> React</p>
                            </div>
                            <div className="col-12 d-flex child_p">
                                <div>
                                    <p>{"<h3>"}</p> <br />
                                    <p>{"</h3>"}</p>
                                </div>
                                <p className="">
                                    Passionate about UI/UX. Over 5 years of development experience in HTML,
                                    CSS, JS, React and NextJS frameworks.

                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <SpaceHight />

        </div>
    )
}


