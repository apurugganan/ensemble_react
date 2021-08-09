import React, { useState } from "react";

export default function Card({ student, tags }) {
  const [clicked, setClicked] = useState(false);

  const [tag, setTag] = useState("")
  const [tagsArray, setTagsArray] = useState([]);

  const toggle = () => {
    setClicked(!clicked);
  };


  const addTag = event => {
    event.preventDefault();
    setTagsArray([...tagsArray, tag]);    
    tags = tagsArray;
    console.log(tags)
    event.target.reset();
  } 

  return (
    <div className="student-card">
      <div className="student-card-avatar">
        <img
          className="student-card-avatar-img"
          src={student.pic}
          alt="student"
        />
      </div>
      <div className="student-text">
        <h2 className="student-name">
          {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
        </h2>
        <div className="student-details">
          <p>Email: {student.email}</p>
          <p>Company: {student.company}</p>
          <p>Skill: {student.skill}</p>
          <p>
            Average:{" "}
            {student.grades.reduce(
              (acc, x) => parseFloat(acc) + parseFloat(x)
            ) / student.grades.length}
            %
          </p>
          <div className="student-grades">
            {clicked === false
              ? null
              : student.grades.map((grade, index) => (
                  <p key={index}>
                    Test {index + 1}: {grade}%
                  </p>
                ))}
          </div>
          <div>
            { 
              tagsArray.map( (tag, index) => 
                <span className = "tag" key={index}>{tag}</span>)
            }
          
            <form className="tag-form" onSubmit={addTag} >
              <input 
                className="tag-form-input"
                placeholder="Add Tags" 
                onChange={event => {setTag(event.target.value)}} 
                />
            </form>           
          </div>
        </div>
      </div>
      <div className="student-accordion" onClick={toggle}>
        <div className="student-accordion-icon">
          {clicked === false ? "+" : "-"}
        </div>
      </div>
    </div>
  );
}
