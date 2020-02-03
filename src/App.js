import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {withAuthenticator} from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import {API , graphqlOperation} from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
const ListToDos = `
query {
  listTodos{
    items {
      id name description completed
    }
  }
}
`;
function App() {
  const [toDos, settoDos] = useState([]);
  const [people, setPeople] = useState([]);
  useEffect(() => {
    let todoData, data;
    // async function fetchData(){
    // todoData = await API.graphql(graphqlOperation(ListToDos));
    // settoDos(todoData.data.listTodos.items);
    // };
    // fetchData();  

    async function fetchPeopleData(){
      data = await API.get('peopleapi', '/people')
      setPeople(data.people);
    }
    fetchPeopleData();

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {
        toDos.map((todo,i) => (
          <h1 key={i}>{todo.name}</h1>
        ))
      }
      {
        people.map((person, i) => (
          <h2 key={i}>{person.name}</h2>
        ))
      }
    </div>
  );
}

export default withAuthenticator(App);
