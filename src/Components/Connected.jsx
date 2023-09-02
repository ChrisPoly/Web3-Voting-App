import React from "react";

const Connected = (props) => {
    return (
        <div className="connected-container">
            <h1 className="connected-header">You are Connected to Metamask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
            { props.showButton ? (
                <p className="connected-account">You have already voted</p>
            ) : (
                <div>
                    <input type="number" placeholder="Enter Country ID" value={props.number} onChange={props.handleNumberChange}></input>
                    <button className="login-button" onClick={props.voteFunction}>Vote</button>
                </div>
            )}
            
            <table id="myTable" className="Contestants-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Country</th>
                    <th>Total Votes</th>
                </tr>
                </thead>
                <tbody>
                {props.Contestants.map((Contestant, Id) => (
                    <tr key={Id}>
                    <td>{Contestant.Id}</td>
                    <td>{Contestant.name}</td>
                    <td>{Contestant.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default Connected;