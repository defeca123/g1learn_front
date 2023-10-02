import './App.css';
import React, { useState, useEffect } from 'react'
import Topics from './components/Topics';
import { useParams } from 'react-router-dom';

function App() {
  const [topics, setTopics] = useState([])
  const [messages, setMessages] = useState([])
  const { id } = useParams();

  const fetchTopicsData = () => {
    fetch("http://127.0.0.1:8000/api/topics")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTopics(data)
      })
  }

  const fetchMessagesData = () => {
    fetch("http://127.0.0.1:8000/api/messages")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setMessages(data)
      })
  }

  useEffect(() => {
    fetchTopicsData()
    fetchMessagesData()
  }, [])

  function refreshPage() {
    window.location.reload(false);
  }

  const sendData = (userId) => {
    const message = document.getElementById('inputMessage');
    const topicId = document.getElementById('selectedTopic');
    let sendMessage = {
      "value": "",
      "topic_id": "",
      "user_id": ""
    }
    if (topicId != null && topicId.selectedOptions.length > 0 && userId != null && message != null) {
        sendMessage.value = message.value;
        sendMessage.topic_id = topicId.selectedOptions[0].value;
        sendMessage.user_id = userId
    }
  
    fetch('http://127.0.0.1:8000/api/create', {
      method: 'POST',
      body: JSON.stringify(sendMessage),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

    alert('Enviada')
    refreshPage()
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          G1 Forum
        </p>
        <select id="selectedTopic">
            {topics.map((e) => <option value={ e.id }>{ e.name }</option>)}
        </select>
        <div id='header'>
          <textarea id='inputMessage' placeholder='Digite sua mensagem aqui...'></textarea>
          <button id='sendButton' onClick={ () => sendData(id) }>Enviar</button>
        </div>
        {topics.length > 0 && (
          <ul>
            {topics.map((topic, index) => (
              <Topics key={ index } id={ topic.id } topic={ topic } messages={ messages.filter((e) => e.topic_id == topic.id) } />
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
