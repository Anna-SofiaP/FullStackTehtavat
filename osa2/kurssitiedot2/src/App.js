const Parts = ({ key, name, exercises}) => {
  return (
    <>
      <p></p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Parts key={part.id} name={part.name} exercises={part.exercises}/>)}
    </>
  )
}

//<p key={part.id}>{part.name} {part.exercises}</p>

const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App