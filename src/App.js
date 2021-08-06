import './App.css';
import axios  from 'axios';
import {useEffect, useState} from 'react';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    (async ()=> {
      const result = await getData();
      setStudents(result.students);
    })()
  },[]);

  return (
    <div className="App">
        {
          students.map( student => { return (
            <div>
              <img src={student.pic} alt="student"/>
              <p>{student.firstName} {student.lastName}</p>
              <p>{student.email}</p>
              <p>{student.company}</p>
              <p>{student.skill}</p>
              <p>{student.grades.reduce((acc, x) => (
                  parseFloat(acc) + parseFloat(x))) / student.grades.length
                }
              </p>
            </div>
          )})
        }
    </div>
  );
}

export default App;

async function getData(){
  try{
    const result = await axios.get(`https://api.hatchways.io/assessment/students`);
    return result.data

  } catch (error){
    console.log(error);
  }
}