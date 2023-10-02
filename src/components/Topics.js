import React, { useState, useEffect } from 'react';
import Message from './Message';

function Topics(props) {
  const { id, topic, messages } = props;
  const [isClicked, setIsClicked] = useState(['']);

  const handleClick = (e) => {
    let element = e.target;
    if (element.tagName != 'INPUT') {
      if (element.tagName === 'P') {
        element = e.target.parentNode;
      }
      
      element.id == isClicked[0] ? setIsClicked(['']) : setIsClicked([element.id])
    }
  };

  useEffect(() => {
    const element = document.getElementById(isClicked);
    document.querySelectorAll('.TopicsBackgroundClicked').forEach((e) => {
      e.className = 'TopicsBackground'
    })
    
    if (element !== null) {
      if (element.className === 'TopicsBackground') {
        element.className = 'TopicsBackgroundClicked'
      } else {
        element.className = 'TopicsBackground'
      }
    }
  }, [isClicked]);

  return (
    <div id={id} className={'TopicsBackground'} onClick={ handleClick }>
      <p>{topic.name}</p>
      { (messages.length > 0 && messages[0].topic_id == isClicked[0]) ? <Message messages={ messages } isClicked={ isClicked } /> : '' }
    </div>
  );
}

export default Topics;
