import React from 'react';
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import './Style/design.scss';
import { BrowserRouter as Router, Redirect, Route, Link, useParams, NavLink } from 'react-router-dom';
import { GiPerspectiveDiceSixFacesSix } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Av from './Component/EditProfile/avatar.png';
import AllBoardGames from './Component/BoardGame/AllBoardGames'
import SingleGame from './Component/BoardGame/SingleGame';
import AddPlay from './Component/Play/AddPlay';
import EditPlay from './Component/Play/editPlay'
import Community from './Component/Community/Community-form'
import LogPlay from './Component/Play/ShowPlays'
import SearchCommunity from './Component/Community/communitySearch'
import {  FaHome,FaCrown ,FaUserAlt,FaUsers } from "react-icons/fa";
import {  MdAddCircle} from "react-icons/md";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  EditOutlined,
  MenuOutlined,
  PlayCircleOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import HomeGames from './Component/BoardGame/HomeGames';
import EditProfile from './Component/EditProfile/EditProfile';
import AllCafe from './Component/Listofallcafe/all-cafe-list';
import SingleCafeShow from './Component/SingleCafeShow/SingleCafeShow';
import Cafe from './Component/Cafe-form/cafe-form';
import OwnedCafe from './Component/OwnedCafes/OwnedCafes'
import OwnedCafe_edit from './Component/OwnedCafes/Ownedcafe_edit'
import CafeSearchShow from './Component/SearchCafe/SearchCafe'
import SingleCommunity from './Component/SingleCommunity/SingleCommunity';
import { Layout, Menu, Breadcrumb, Avatar, Button ,List,Modal} from "antd";
import './Component/BoardGame/allStyle.css';
import noBg from './Component/Community/images.png';
import CommunitySearch from './Component/Community/communitySearch';
import Axios from 'axios';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;let a="";
class Routes extends React.Component {
  state = {
    visible: false,
    accessed: '',
    collapsed: false,
    img: '',
    disp: 'none',
    username: localStorage.getItem('user'),
    memberList: [],
    ownerList: [] 
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    setTimeout(() => {
      this.setState({ visible: false });
    }, 100);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  data = {
    refresh: localStorage.getItem('refresh')
  }
  edit = () => {
    <Link to={"/editProfile/:" + localStorage.getItem('id')} />
  }
  proxyurl = "http://localhost:8010/proxy";

  getInfo = (e) => {



    Axios.get(this.proxyurl + '/auth/edit_profile/', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    }
    ).then((res) => {

      localStorage.setItem('avatar', res.data.avatar);


    })
      .catch((error) => {


      }
      )



  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  proxyurl= "http://localhost:8010/proxy";

  componentDidMount() {

    Axios.post('http://localhost:8010/proxy/auth/token/refresh/', JSON.stringify(this.data),
      {
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => {
        localStorage.setItem('access', res.data.access);
        this.setState({ accessed: 'true' });
        this.getInfo();
        Axios.get(this.proxyurl+'/community/owner_communities_list/',{headers:{
          'Content-Type' : 'application/json','Access-Control-Allow-Credentials':true,
          'Accept' : 'application/json',
          'Authorization' :`Bearer ${localStorage.getItem('access')}`
        }}
      ).then((res)=>{
        //console.log(res.data+"reeee")
        this.setState({ownerList: res.data})
      })
      .catch((error)=>
        {
         // console.log(error.respose+"errrr")
        })


    Axios.get(this.proxyurl+'/community/member_communities_list/',{headers:{
      'Content-Type' : 'application/json','Access-Control-Allow-Credentials':true,
      'Accept' : 'application/json',
      'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
  ).then((res)=>{
    //console.log(res.data+"reeee")
    this.setState({memberList: res.data})
  })
  .catch((error)=>
    {
     // console.log(error.respose+"errrr")
    })

      }).catch()

  }
  exit = () => {
    this.setState({ accessed: 'false' });
    
    localStorage.clear();

  }

  cntrl = () => {
    const { collapsed } = this.state;
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("head").style.top = "0";
      } else {
        document.getElementById("head").style.top = "-67px";
      }
      prevScrollpos = currentScrollPos;
    }
    return (
      <Layout style={{ minHeight: "100vh", backgroundColor: "#282828" }}>
        <Header
          id="head"
          className="ant-layout-header"
          style={{ fontSize: "24px", height: "67px", paddingLeft: "2%" }}
        >
          <span style={{ float: 'left', marginTop: 'auto' }}>
            <MenuOutlined className='bar' style={{ verticalAlign: 'middle' }} onClick={() => this.state.disp === 'none' ? this.setState({ disp: 'inline' }) : this.setState({ disp: 'none' })} />
          </span>
          <h2 style={{ margin: "auto", display: 'inline' }}> GoardBame</h2>


        </Header>

        <Layout
          className="site-layout"
          style={{ margin: "0 0" }}
        >
          <Sider
            collapsible

            collapsed={collapsed}
            onCollapse={this.onCollapse}
            style={{ backgroundColor: "#282828", display: this.state.disp }}

          >
            <Menu
              className="side-menu"
              theme="dark"
              mode="inline"
              style={{ position: "sticky", marginTop: '67px' }}>


              <Menu.Item key="3" icon={<FaHome style={{ verticalAlign: 'middle', marginTop: '-4px' }} />}>
                <NavLink to="/homePage/:id">{' ' + 'Home'}</NavLink>

              </Menu.Item>
              <Menu.Item className="m-item" key="0" icon={<EditOutlined style={{ verticalAlign: 'middle', marginTop: '-4px' }} />}
                style={{ height: "6%", marginTop: "4%", marginBottom: "5%" }}>

                <NavLink to={"/editProfile/:" + localStorage.getItem('id')}> {this.state.username + '(tap to edit)'}</NavLink>
              </Menu.Item >
                <SubMenu key="sub1" icon={<GiPerspectiveDiceSixFacesSix style={{ verticalAlign: 'middle', marginTop: '-4px' }}/>} title={' '+"Play"}>
                  <Menu.Item className="m-item" key="2" icon={<AiOutlinePlusCircle style={{ verticalAlign: 'middle', marginTop: '-5px' }} />}>
                    <NavLink to='/addplay/'> Create play</NavLink>
                    </Menu.Item>
                    <Menu.Item className="m-item" key="1" icon={<PlayCircleOutlined style={{ verticalAlign: 'middle', marginTop: '-5px' }} />}>
                      <NavLink to='/showplay/'>Show play</NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu title= " Community" icon ={<FaUsers style={{ verticalAlign: 'middle', marginTop: '-4px',paddingRight: '3%',fontSize: '19px' }} />}>
                {     <List
size="large"
itemLayout="horizontal"
dataSource={this.state.ownerList}
renderItem={item => (
  
  this.state.ownerList.forEach(item => a=(item.image.base64)),
  <Menu.Item  className="subed" key={item.name+item.id}>
  <List.Item style={{borderColor: 'transparent'}}>
    <List.Item.Meta  style={{borderColor: 'transparent'}}
      avatar={item.image.base64===''?<img src={noBg} style={{width: "40px",height: "40px",borderRadius: '10px'}} className="cafe_img"/>:<img src={item.image.base64}style={{width: "40px",height: "40px",borderRadius: '10px'}} className="cafe_img"/>}
      description={<Link to={'/allcafes/:'+item.id}><p style={{color: 'whitesmoke',fontSize: '16px',marginLeft: '1%',marginTop: '4%'}}><FaCrown style={{color: 'gold',marginTop: '-3%'}}/> {item.name}</p></Link>}
    
    
/>  
  </List.Item></Menu.Item>
)}
/> }
{     <List
size="large"
itemLayout="horizontal"
dataSource={this.state.memberList}
renderItem={item => (
  
  this.state.memberList.forEach(item => a=(item.image.base64)),
  <Menu.Item className="subed" key={item.name+item.id}>
  <List.Item style={{borderColor: 'transparent'}}>
    <List.Item.Meta  style={{borderColor: 'transparent'}}
      avatar={item.image.base64===''?<img src={noBg} style={{width: "40px",height: "40px",borderRadius: '10px'}} className="cafe_img"/>:<img src={item.image.base64}style={{width: "40px",height: "40px",borderRadius: '10px'}} className="cafe_img"/>}
      description={<Link to={'/allcafes/:'+item.id}><p style={{color: 'whitesmoke',fontSize: '16px',marginLeft: '1%',marginTop: '4%'}}><FaUserAlt style={{fontSize: '14px',color: 'cyan',marginTop: '-5%'}}/> {item.name}</p></Link>}
    
    
/>  
  </List.Item></Menu.Item>
)}
/> }
<Menu.Item className="m-item" key="added" style={{display: 'flex',alignItems: 'center',textAlign: 'center'}}>
  
  <MdAddCircle style={{marginLeft: '22%',fontSize: '44px',color: 'hsl(22, 94%, 49%)'}} onClick={this.showModal}/>
  <Modal
          visible={this.state.visible}
          title="Join A Community"
          onOk={this.handleOk}
          style={{height: '36vh'}}
          onCancel={this.handleCancel}
          footer={[
            <Button className="btn btn-primary" key="back" onClick={this.handleCancel}>
              Return
            </Button>
          ]}
        >
          <h6>Enter the name of a community</h6>
          <div style={{alignContent: 'center' ,marginLeft: 'auto',marginRight: 'auto',alignItems: 'center',textAlign: 'center'}}>
          <CommunitySearch/>
          </div>
        </Modal>
</Menu.Item>

                 
                </SubMenu>
                  <SubMenu title="Cafes" icon={<CoffeeOutlined style={{ verticalAlign: 'middle', marginTop: '-6px' }}/>}>
                    <Menu.Item className="m-item" key="14" >
                      <NavLink to='/cafeform'>Create Cafe</NavLink>
                    </Menu.Item>
                    <Menu.Item className="m-item" key="12" >
                      <NavLink to='/allcafes/'>Show Cafe List</NavLink>
                    </Menu.Item>
                    <Menu.Item className="m-item" key="13" >
                      <NavLink to='/ownedcafe'>Owned Cafe</NavLink>
                    </Menu.Item>
                  </SubMenu>


                  <Menu.Item className="m-item" key="9" onClick={this.exit} icon={<FileOutlined style={{ verticalAlign: 'middle', marginTop: '-5px' }} />}>
                    <NavLink to='/'>Exit</NavLink>
                  </Menu.Item>
          </Menu>
        </Sider>


              <Content className="ant-layout-content" style={{ margin: "0 0" }}>
                <Breadcrumb style={{ margin: "0px 0" }}>
                  {/*   <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                </Breadcrumb>
                <div
                  className="site-layout-background"
                  style={{ marginTop: "4%", minHeight: "100vh", overflow: 'hidden', height: 'max-content' }}
                >
                  <switch>
                    <Route exact path="/homePage/:id" component={HomeGames} />
                    <Route exact path="/editProfile/:id" component={EditProfile} />
                    <Route exact path="/allgames" component={AllBoardGames} />
                    <Route exact path="/allgames/:id" component={SingleGame} />
                    <Route exact path="/allcafes" component={AllCafe} />
                    <Route exact path="/allcafes/:id" component={SingleCafeShow} />
                    <Route exact path="/cafeform" component={Cafe} />
                    <Route exact path="/ownedcafe" component={OwnedCafe} />
                    <Route exact path="/editcafe/:id" component={OwnedCafe_edit} />

                    <Route exact path="/createCommunity" component={Community} />
                    <Route exact path="/addplay/" component={AddPlay} />
                    <Route exact path="/community" component={SingleCommunity} />
                    <Route exact path="/Search_Com" component={CommunitySearch} />

                    <Route exact path="/showplay/" component={LogPlay} />
                    <Route exact path="/editplay/:id" component={EditPlay} />

                    <Route exact path='/'>
                      <Redirect to="/homePage/:id" />
                    </Route>
                    <Route exact path='/signup'>
                      <Redirect to="/homePage/:id" />
                    </Route>

                  </switch>

                </div>
              </Content>
  
  </Layout>
</Layout>);

}
    render() {
      if(this.state.accessed==='')
      {
        <div class="d-flex justify-content-center" style={{marginTop: '23%'}}>
          <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
          <span class="sr-only" >Loading...</span>
          </div>
          </div>
      }
     else if(this.state.accessed==='false')
     {
       return(
        <Router>
            <switch>
              <Route exact path='/'>
                <Login />
              </Route>
              <Route exact path="/homePage/:id">
                <Redirect to='/' />
              </Route>

              <Route exact path='/signup'>
                <Signup />
              </Route>
            </switch>
          </Router>
       )
      }
      else{

          }
      return(

      <Router>
            <switch>
              <Route component={this.cntrl} />


            </switch>


          </Router>
          
      );

      }
       
               
            
        
    }



export default Routes;