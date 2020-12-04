import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';

function App() {

  const[inputName, setInputName] = useState('')
  const[name, setName] = useState('');
  const[repos, setRepos] = useState([''])
  const[click, setClick] = useState(true)
  const[user, setUser] = useState([''])
  const[fullRepoName, setFullRepoName] = useState('')
  const[repoDescription, setRepoDescription] = useState([''])



  const usersAxios = axios.create ({
    baseURL: `https://api.github.com/users/${name}`
});

  const reposAxios =  axios.create ({
    baseURL: `https://api.github.com/repos/${fullRepoName}`
});



 useEffect(() => {
if (name === '') {
  return null
} else {
    async function getUserData() {
        const requestRepos = await usersAxios.get('/repos')
          setRepos(requestRepos.data)
        const requestUser = await usersAxios.get('')
          setUser(requestUser.data)
          
    }
  
    getUserData()
 

  }

  
  if (fullRepoName === '') {
    return null
  } else {
      async function getRepoData() {
          const requestRepoDescription = await reposAxios.get('')
          setRepoDescription(requestRepoDescription.data)
            
      }

      getRepoData()

}}, [name, fullRepoName]) 


  return (


    <div className="App">
      
      <form 
      className='formContainer' 
      onSubmit={(e) => {
      e.preventDefault()
      setName(inputName)
      }}>

      <input 
      placeholder="Pesquisar perfil"
      className='inputField' 
      onChange={(e) => {
      setInputName(e.target.value)
      }} type="text" autoComplete="off" />

     <button className="buttonSearch"><SearchIcon/></button> 



      </form>

      <div className={name === '' ? 'userInitialState' : 'displayUser'}>

        <img className="avatar" src={`${user.avatar_url}.jpg`} alt='avatar' />
        <div className="followContainer">
          <h3 style={{marginRight: '10px'}}> Followers: {user.followers}</h3>
          <h3> Following: {user.following}</h3>
        </div>

          <h3>{user.email}</h3>
          <h4 style={{marginBottom: '50px'}}>{user.bio}</h4>

      </div>

<div className={fullRepoName === '' ? 'repoFullNameNull' : "repoDescription"}>
  <p>   Descrição: {repoDescription.description} </p>
  <p>       Estrelas:  {repoDescription.stargazers_count}</p>
  <p>      Linguagem: {repoDescription.language} </p>
  <p>      Url: {repoDescription.url}</p>
</div>

        <button 
          style={{marginBottom: '30px'}}
          onClick={() => {
          setClick(!click)
          setRepos([...repos.reverse()])}}> {click ? 'Ordem decrescente ↑' : 'Ordem crescente ↓'} </button>


        <ul >
{
     repos.map((item, index) => {
       return (
         <li className='repos' key={index} onClick={() => {setFullRepoName(item.full_name)}}> {item.name}  </li>
       )
       })
}
       </ul>
       


    </div>
  );
}

export default App;
