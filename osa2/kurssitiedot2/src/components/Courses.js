const Total = ({ parts }) => {
    var total = parts.reduce((sum, next) => {
      return sum + next.exercises
    }, 0);
  
    return (
      <>
        <p><b>Exercises in total {total}</b></p>
      </>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part}/>)}
        <Total parts={parts} />
      </>
    )
  }
  
  const Header2 = ({ header }) => {
    return (
      <>
        <h2>{header}</h2>
      </>
    )
  }
  
  const Header1 = (props) => {
    console.log('Big header is', props)
    return (
      <>
        <h1>{props.header}</h1>
      </>
    )
  }
  
  const Course = ({ course }) => {
    console.log('Course number', course.id, 'header', course.name)
    return (
      <>
        <Header2 header={course.name} />
        <Content parts={course.parts} />
      </>
    )
  }
  
  const Courses = ({ courses }) => {
    console.log('The courses are', courses)
    return (
      <>
        <Header1 header="Web Development Curriculum"/>
        {courses.map(course => <Course key={course.id} course={course} /> )}
      </>
    )
  }

  export default Courses