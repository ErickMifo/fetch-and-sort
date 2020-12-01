import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

function App() {

  const[inputName, setInputName] = useState('')
  const[name, setName] = useState('');
  const[data, setData] = useState([''])
  const[click, setClick] = useState(true)


  const instance = axios.create ({
    baseURL: `https://api.github.com/users/${name}/repos`
});


 useEffect(() => {
if (name === '') {
  return null
} else {
    async function getData() {
        const request = await instance.get('')
          setData(request.data)
    }
  
    getData()
 

  }}, [name]) 


  return (


    <div className="App">
      <form onSubmit={(e) => {
        e.preventDefault()
        setName(inputName)
      }}>

      <input onChange={(e) => {
        setInputName(e.target.value)
      }} type="text" autoComplete="off" />

      <button> Pesquisar </button>
      </form>
        <button onClick={() => {
          setClick(!click)
          setData([...data.reverse()])}}> {click ? 'Ordem decrescente' : 'Ordem crescente'} </button>


        <ul>
{
     data.map((item, index) => {
       return (
         <li key={index}> {item.name} </li>
       )
       })
}
       </ul>


    </div>
  );
}

export default App;
