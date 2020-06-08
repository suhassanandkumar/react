import React, { Component } from "react";
import { MuiThemeProvider } from "material-ui/styles";
import { AppBar, TextField, RaisedButton } from "material-ui";
import { withRouter } from "react-router";
import axios from "axios";

class Login extends Component {

    constructor(props){
        super(props)
       
        this.state = {
            username:'',
            password:''
        }
    }

    componentDidMount() {
       

        console.log("Flow on main thread")

    }

    signApi = () => {
        axios.post("http://localhost:3001/login",{
            name:this.state.username,
            password:this.state.password
        }).then((res)=>{
            console.log("response from server: "+res);
            if(res.data.status){
                console.log("Valid response")
                this.props.history.push("/home")
            }
            
        }).catch((error)=>{
            console.log("Error Respons efrom serfver "+error);
        })
    }

    render(){
        return (

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
                    <RaisedButton label="SignIn" onClick={() => this.signApi()} primary={true} style={this.style}></RaisedButton>
                    <RaisedButton label="SignUp" onClick={() => {this.props.history.push("/signup")}} primary={true} style={this.style}></RaisedButton>
                    </div>

               );
    }

     style = {
        margin: 15,
    };
   

}
export default withRouter( Login);

