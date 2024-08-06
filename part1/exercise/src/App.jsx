import { useState } from "react";
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  );
};
const Content = (props) => {
  return (
    <>
      <Part part={props.course.part[0].name} exercise={props.course.part[0].exercises1} />
      <Part part={props.course.part[1].name} exercise={props.course.part[1].exercises2} />
      <Part part={props.course.part[2].name} exercise={props.course.part[2].exercises3} />
    </>
  );
}
const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  );
}
const Footer = (props) => {
  return (

    <p>Total Number of exercises {props.course.part[0].exercises1 + props.course.part[1].exercises2 + props.course.part[2].exercises3}</p>
  );
}
const App = () => {
  const [counter, setCounter] = useState(0);
  // setTimeout(
  //   ()=>setCounter(counter+1),
  //   1000
  // )
  const course = {
    name: 'Half Stack application development',
    part:
      [
        {
          name: 'Fundamentals of React',
          exercises1: 10
        },
        {
          name: 'Using props to pass data',
          exercises2: 7
        },

        {
          name: 'State of a component',
          exercises3: 14
        }
      ]
  };
  return (
    <div>
      
      <Header course={course} />
      <Content course={course} />
      <Footer course={course} />
      <button onClick={()=>setCounter(counter+1)}>Counter</button>
      <div>{counter}</div>
      <button onClick={()=>setCounter(0)}>Reset</button>
    </div>
  );
}

export default App

