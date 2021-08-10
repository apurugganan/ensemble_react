import './App.css';
import axios  from 'axios';
import {useEffect, useState} from 'react';
import Card from './Card'

function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function addTag(args, index){ 
    if(!students[index].tags){
      students[index]['tags'] =[args];
      setStudents([...students])
    } else {
      students[index].tags = [...students[index].tags, args];
      setStudents([...students])
    }
  }

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
        <div className="search-bar">
          <input className="search-bar-input"
            type="text" 
            placeholder="Search by Name"
            onChange={event =>{setSearchTerm(event.target.value)} }
            />
        </div>
        {
          // Search by Name feature
          students.filter(student => {
            if(searchTerm === ""){
              return student
            } else if (
                student.firstName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                || student.lastName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
              ){
             
              return student;
            } else {
              return null;
            }
            })
            // Display List of Student Cards 
            .map((student, index) => {  
            
              return (
              // Student Card 
              <Card 
                student={student} 
                key={index} 
                index={index}
                addTag={addTag}
                />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;

//----------------Network Function -------------------------------------

async function getData(){
  try{
    const result = await axios.get(`https://api.hatchways.io/assessment/students`);
    return result.data

  } catch (error){
    console.log(error);
  }
}


