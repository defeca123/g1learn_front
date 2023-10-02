import { useEffect, useState } from "react";

function Message(props) {
  const { messages, isClicked } = props;
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (messages[0].topic_id == isClicked[0]) { setRender(true) } else setRender(false)
  }, isClicked)

  return (
        render ?
        <div className="Messages">
          {messages.map((message, index) => (
            <div key={index} className="eachMessage">
              <p><u>{message.user_name.length > 0 && message.user_name[0].name}</u></p>
              <p>{message.value}</p>
            </div>
          ))}
        </div>
        : ''
  );
}

export default Message;
