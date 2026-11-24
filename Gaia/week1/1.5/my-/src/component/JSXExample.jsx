function JSXExample(){
  const name = "React Developer"
  const isLearning = true
  const skills = ['JavaScript', 'React', 'CSS']

  return(
    <div>
      {/*Single parent element*/}
    {/*1.Embedding JavaScript expressions*/}
<h1>Hello,{name}!</h1>

{/*2. Conditional rendering */}
<p>{isLearning ? "Currentlt learning React" : "React expert"}</p>

{/*3.Using className instead of class */}
<div className="skill-container">
    <h3>Skills:</h3>
    {/*4.Rendering list */}
    <ul>
        {skills.map((skill,index)=> (
        <li key={index}>{skill}</li>
       ) )}
    </ul>
    </div>

    {/* 5. Self-closing tags */}
    <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/3840px-Vitejs-logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" height={100} width={200} alt="Vite logo" />
    <br />
    <hr />
    </div>  
    )
}

export default JSXExample