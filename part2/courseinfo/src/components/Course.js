const Header = ({ title }) => <h1>{title}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)} 
    </div>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
  const amount = parts.reduce((accum, curValue) => accum + curValue.exercises, 0)
  return <p><b>total of {amount} exercises</b></p>
}

const Course = ({ courses }) => {
  return (
  <>
    {courses.map((course) => {
      return (
        <div key={course.id}>
          <Header title={course.name} />
          <Content  parts={course.parts} />
          <Total  parts={course.parts} />
        </div>        
      )
      }
    )}
  </>)
}

export default Course