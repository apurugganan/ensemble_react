import './App.css';
import axios  from 'axios';
import {useEffect, useState} from 'react';

function App() {
  const [students, setStudents] = useState([]);

  // Get data from API
  useEffect(()=>{
    (async ()=> {
      const result = await getData();
      setStudents(result.students);
    })()
  },[]);

  return (
    <div className="App">
      <div className="container">
        {
          students.map( student => { return (
            <div className="student-card">
              <div className="student-card-avatar">
                <img className="student-card-avatar-img" src={student.pic} alt="student"/>
              </div>  
              <div className="student-text">
                <h2 className="student-name">{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</h2>
                <div className="student-details">
                  <p>Email: {student.email}</p>
                  <p>Company: {student.company}</p>
                  <p>Skill: {student.skill}</p>
                  <p>Average: {student.grades.reduce((acc, x) => (
                    parseFloat(acc) + parseFloat(x))) / student.grades.length
                  }
                   %</p>
                </div>
              </div>
            </div>
          )})
        }
      </div>
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


