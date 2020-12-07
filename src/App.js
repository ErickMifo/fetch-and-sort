import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';

function App() {

  const[inputName, setInputName] = useState('')
  const[name, setName] = useState('');
  const[repos, setRepos] = useState([''])
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


  useEffect(() => {
    repos.sort((a,b) => (a.stargazers_count > b.stargazers_count) ? 1 : ((b.stargazers_count > a.stargazers_count) ? -1 : 0))
  }, [repos])


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

<div className={fullRepoName === '' ? 'displayNone' : "repoDescription"}>
  <p className="clearDescription" onClick={() => { setFullRepoName('') }}> x </p>
  <p>   Descrição: {repoDescription.description} </p>
  <p>       Estrelas:  {repoDescription.stargazers_count}</p>
  <p>      Linguagem: {repoDescription.language} </p>
  <p>      Url: <a rel="noopener noreferrer" target="_blank" href={repoDescription.html_url}>{repoDescription.html_url}</a></p>
</div>

<div className={name === '' ? 'displayNone' : "buttonContainer"}>

        <button 
          style={{marginBottom: '30px'}}
          onClick={() => {
            console.log(repos)

          setRepos([...repos.sort((a,b) => (b.stargazers_count > a.stargazers_count) ? 1 : ((a.stargazers_count > b.stargazers_count) ? -1 : 0))])}}> 
   Ordem decrescente ↑
          </button>

          <button 
          style={{marginBottom: '30px'}}
          onClick={() => {
            console.log(repos)
          setRepos([...repos.sort((a,b) => (a.stargazers_count > b.stargazers_count) ? 1 : ((b.stargazers_count > a.stargazers_count) ? -1 : 0))])}}> 
          Ordem crescente ↓
          </button>
</div>

        <ul >
{
     repos.map((item, index) => {
       return (
         <li className='repos' key={index} onClick={() => {setFullRepoName(item.full_name)}}> {item.name}  {item.stargazers_count}</li>
       )
       })
}
       </ul>
       


    </div>
  );
}

export default App;
