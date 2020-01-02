import React from "react";

class GroupChat extends React.Component {

    render(){
        return (
            <div className="chatWindow">
                <ul className="chat" id="chatList">
                <div key={1}>
                    <li className="self">
                        <div className="msg">
                            <p>ABC</p>
                            <div className="message">Hello</div>
                        </div>
                    </li>
                </div>
                {/* {this.state.groupMessage.map(data => (
                    <div key={data.id}>
                    {this.state.user.uid === data.sender.uid ? (
                        <li className="self">
                        <div className="msg">
                            <p>{data.sender.uid}</p>
                            <div className="message"> {data.data.text}</div>
                        </div>
                        </li>
                    ) : (
                        <li className="other">
                        <div className="msg">
                            <p>{data.sender.uid}</p>
                        <div className="message"> {data.data.text} </div>
                        </div>
                        </li>
                    )}
                    </div>
                ))} */}
                </ul>
                <div className="chatInputWrapper">
                <form onSubmit={this.handleSubmit}>
                    <input
                    className="textarea input"
                    type="text"
                    placeholder="Enter your message..."
                    onChange={this.handleChange}
                    />
                </form>
                </div>
            </div>
        );
    }
}

export default GroupChat;
    