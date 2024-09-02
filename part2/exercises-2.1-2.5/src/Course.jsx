const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ course }) => course.parts.map(parts => <Part part={parts.name} exercise={parts.exercises} key={parts.id} />)

const Part = (props) => <p>{props.part} {props.exercise}</p>


const Footer = ({ course }) => {
  const total = course.parts.reduce((sum,part)=>sum+part.exercises,0)
  return (
      <p> Total Number of exercises {total}</p>
  );
}

const Course = (props) => {

  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Footer course={props.course} />
    </div>
  )
}

export default Course