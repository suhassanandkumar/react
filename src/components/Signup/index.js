import React, {Component} from 'react';
import {  TextField, RaisedButton } from "material-ui";
import { withRouter } from "react-router";

export  class SignUpComponent extends Component {

    constructor(props){
        super(props)
       
        this.state = {
            username:'',
            password:''
        }
    }


    render() {

        return (<div>
             <div style={{margin:'auto',display:'table'}}>

<TextField hintText="Enter Your UserName"
floatingLabelText="User Name"
onChange={ (event,newValue) => this.setState({username:newValue})}></TextField>

<br></br>
<TextField type="password"
hintText="Enter Password"
floatingLabelText="Password"
onChange={ (event,newValue) => this.setState({password:newValue})}
></TextField>
<br/>

<RaisedButton label="SignUp" onClick={() => {this.props.history.goBack()}} primary={true} style={this.style}></RaisedButton>
</div>

        </div>)
    }
}
export default withRouter( SignUpComponent);