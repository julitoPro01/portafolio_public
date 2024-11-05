import { ProjectModel } from "../../model/ProjectModel";
import img from '../../assets/project/peakpx.jpg'

export const ProjectCarrucel = ({ props }: { props: ProjectModel }) => {

  const { description,id,title } = props;

  return (
    <div className=" content__preview" id={title+id}>

    <div className=" content__img">
      <img className="" src={img} alt="preview" />
    </div>

    <div className=" content__description">
      <div className=" description">
        {description}  </div>
      <div className=" description01__sm">
        {description} </div>
    </div>

  </div>

  )
}

