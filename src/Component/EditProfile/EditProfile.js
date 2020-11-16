import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Av from './avatar.png';
import {
  UserOutlined
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import FormItem from 'antd/lib/form/FormItem';
import {
    Form,
    Input,
    Tabs,
    DatePicker
} from "antd";
const formItemLayout = {
 
    wrapperCol: {
        xs: {
            span: 0,
        },
        sm: {
            span: 24,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 8,
        },
        sm: {
            span: 24,
            offset: 0,
        },
    },
};

const { TabPane } = Tabs;

class EditProfile extends React.Component {
    state = {
        avatar:"",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        newPassword: "",
        confirm_password: "",
        year:"",
        loggedIn:"",
         msg:"",
         edit:"",
         done:"",
         img:""
    };
    onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    onChange = (e) => {
        e.persist();
        console.log(e.target.value);
        console.log(e.target.name);
        this.setState(() => {
            return {
                [e.target.name]: e.target.value,
            };
        });
        console.log(this.state);
    };
    passChange=e=>{
        this.setState({password:e.target.value})
      }
      newPassChange=e=>{
        this.setState({newPassword:e.target.value})
      }
      confirmChange=e=>{
        this.setState({confirm_password:e.target.value})
      }
      firstChange=e=>{
        this.setState({firstname:e.target.value});
        this.setState({edit:"true"});

      }
      lastChange=e=>{
        this.setState({lastname:e.target.value});
        this.setState({edit:"true"});

      }
      emailChange=e=>{
        this.setState({email:e.target.value});
        this.setState({edit:"true"});

      }
    onyearChange=(date, dateString)=> {
         this.state.year=dateString;
         this.setState({edit:"true"});

      }
      Upload=async(e)=>{
        const file=e.target.files[0];
       const base64= await this.Convert(file)
       this.setState({img:base64});
       this.setState({edit:"true"})
      }
      Convert=(f)=>{
        return new Promise((resolve,reject)=>{
          const fileReader=new FileReader();
          fileReader.readAsDataURL(f);
          fileReader.onload=()=>{
            resolve(fileReader.result);
          };
          fileReader.onerror=(err)=>{
            reject(err);
          };
        }) ;
      }

      proxyurl= "http://localhost:8010/proxy";

    onSaveGeneral = (e) => {
        if((this.state.edit==="true") &&(this.state.email.includes("@"))&&(this.state.email.includes(".com")))
        {
            e.preventDefault();
            this.setState({loggedIn:"logging in"})
        const data={
            email:this.state.email,
            first_name:this.state.firstname,
            last_name:this.state.lastname,
            avatar:this.state.img,
            age:this.state.year
        }
        axios.put(this.proxyurl+'/auth/edit_profile/',JSON.stringify(data),{headers:{
            'Content-Type' : 'application/json;charset=utf-8',
            'Access-Control-Allow-Credentials':true,
  'Accept' : 'application/json',
  'Authorization' :`Bearer ${localStorage.getItem('access')}`
        }}
    ).then((res)=>{  
        this.setState({edit:""});
         this.setState({msg:"done"});
         this.setState({loggedIn:""});
         
         localStorage.setItem('avatar',data.avatar);
         localStorage.setItem('email',data.email);
         this.setState({done:""});


    } )
    .catch((error)=>
    {
     this.setState({edit:""});
     this.setState({loggedIn:""});
     this.setState({msg:"something went wrong please try again."});
            } 
            )
        
        }


        else
        {
            this.setState({msg:"You haven't changed any information."});
            this.setState({loggedIn:""});
        }

        
        }
    getInfo=(e)=>
    {
        
        if(this.state.done==="")
        {

        
        
        axios.get(this.proxyurl+'/auth/edit_profile/',{headers:{
            'Content-Type' : 'application/json;charset=utf-8',
            'Access-Control-Allow-Credentials':true,
  'Accept' : 'application/json',
  'Authorization' :`Bearer ${localStorage.getItem('access')}`
        }}
    ).then((res)=>{  
        
        this.setState({email:res.data.email});
        this.setState({firstname:res.data.first_name});
        this.setState({lastname:res.data.last_name});
        this.setState({img:res.data.avatar});
        this.setState({year:res.data.age});
        this.setState({done:"yes"});

    
    } )
    .catch((error)=>
    {

            } 
            )
        
        }
    
    }
    
    onSavePassword = (e) => {
        if((this.state.newPassword!=="")&&(this.state.password!=="")&&(this.state.newPassword.length>=8)
  &&(this.state.newPassword===this.state.confirm_password))
   {
    
    
    e.preventDefault();
    this.setState({loggedIn:"logging in"})
    
        const data={
            old_password:this.state.password,
            password:this.state.newPassword
        }
        if(this.state.password===localStorage.getItem('pass'))
        {

        
        axios.put(this.proxyurl+'/auth/change_password/',JSON.stringify(data),{headers:{
            'Content-Type' : 'application/json;charset=utf-8',
            'Access-Control-Allow-Credentials':true,
  'Accept' : 'application/json',
  'Authorization' :`Bearer ${localStorage.getItem('access')}`
        }}
    ).then((res)=>{  
        
         
         this.setState({msg:"done"});
         this.setState({loggedIn:""});
         localStorage.setItem('pass',data.password);
    } )
    .catch((error)=>
    {

     this.setState({loggedIn:""});
     this.setState({msg:"something went wrong please try again."});
     localStorage.setItem('pass',data.password);
            } 
            )
        
        }
        else
        {
            this.setState({msg:"Password is not correct!"});
            this.setState({loggedIn:""});
        }
    }
}
componentDidMount() {
    this.getInfo();
}
    render() {
        return (
            
            <div className="EditProfile_container">
               
                <Form
                    {...formItemLayout}
                    name="Edit"
                    
                    onFinish={this.onSubmit}
                    scrollToFirstError
                >


                    <Tabs defaultActiveKey="1">
                        <TabPane tab="General" key="1">
                            <FormItem><input type="file" onChange={this.Upload}  style={{display: 'none'}}
                            ref={fileInput=>this.fileInput=fileInput}></input>
                            <button  onClick={()=>this.fileInput.click()}
                            style={{float: 'left'}}>choose image</button>
       
        <img src={this.state.img===''?Av:this.state.img} style={{float: 'right'}}height="50px" ></img></FormItem>
                        <Form.Item
                        name="firstname"
                        rules={[
                            {
                                required: false,
                                whitespace: true,
                            }
                        ]}
                    >
                        <Input name="firstname" placeholder={this.state.firstname===""?"first name":this.state.firstname+" (optional)"} onChange={this.firstChange} />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        rules={[
                            {
                                required: false,
                                whitespace: true,
                            }
                        ]}
                    >
                        <Input name="lastname" placeholder={this.state.lastname===""?"last name":this.state.lastname+" (optional)"} onChange={this.lastChange} />
                    </Form.Item>


                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input name="email" placeholder={this.state.email} onChange={this.emailChange} />
                    </Form.Item>


                <span >
                    <Form.Item style={{marginLeft: '19%'}}
                        name="year"
                        rules={[
                            {
                                type:"date" ,
                                message: "The input is not valid year!",
                            },
                            {
                                required: false,
                            },
                        ]}
                    >
                         <DatePicker name="year"  onChange={this.onyearChange} picker="year" />
                    </Form.Item></span>
                    <Form.Item {...tailFormItemLayout}>
                    <button type="button"  class="btn btn-primary" style={{marginLeft: '19%', width: '57%'}}
  
                        onClick={this.onSaveGeneral}  name="submit">
    
  
                        <span
                        class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
                         role={this.state.loggedIn==="logging in" ?"status":""}
                        aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

                        </span>
                        {this.state.loggedIn==="logging in" ? "Loading...":"Save_changes" }
                    </button>
                    </Form.Item>
                    <p className ="ant-form-item-extra" >{this.state.msg==="You haven't changed any information."?
    "You haven't changed any information.":""}</p>
    <p className ="ant-form-item-extra" >{this.state.msg==="something went wrong please try again."?
    "Something went wrong please try again.":""}</p>

                
                <p className ="ant-form-item-extra2 "  >{this.state.msg==="done"?
                    "Changes have been saved successfuly":""}</p>

                </TabPane>



                    <TabPane tab="Password" key="2">
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your current password!",
                            },
                        ]}
                    >
                        <Input.Password name="password" onChange={this.passChange} />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new password!",
                            },,({ getFieldValue }) => ({
                                validator(rule, value) {
                                  if (!value || JSON.stringify(value).length>=10) {
                
                                    return Promise.resolve();
                                  }
                
                                  return Promise.reject(
                                    "Password is too short." 
                                  );
                
                                },
                              }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password name="newPassword" onChange={this.newPassChange} />
                    </Form.Item>


                    <Form.Item
                        name="confirm"
                        dependencies={["newPassword"]}
                        hasFeedback
                        onChange={this.confirmChange}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your new password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("newPassword") === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        "The two passwords that you entered do not match!"
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <p className ="ant-form-item-extra" >{this.state.msg==="Password is not correct!"?
    "Password is incorrect!":""}</p>
    <p className ="ant-form-item-extra" >{this.state.msg==="something went wrong please try again."?
    "Something went wrong please try again.":""}</p>

                    <Form.Item {...tailFormItemLayout}>
                    <button type="button" class="btn btn-primary" style={{width: '100%'}}
  
                        onClick={this.onSavePassword}  name="submit">
    
  
                        <span
                        class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
                         role={this.state.loggedIn==="logging in" ?"status":""}
                        aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

                        </span>
                        {this.state.loggedIn==="logging in" ? "Loading...":"Change password" }
                    </button>
                    </Form.Item>
                    <p className ="ant-form-item-extra2 "  >{this.state.msg==="done"?
    "Password has successfuly changed.":""}</p>
                    </TabPane>
                </Tabs>
                </Form>
            </div>
        );
    }
}
export default EditProfile;