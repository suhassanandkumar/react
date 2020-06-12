import React,{ Component } from "react";
import { withRouter } from "react-router";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import { menuItems } from './listItems';
import TableDash from "../../../components/Tabledash/Tabledash";




class DashBoard extends Component{
   constructor(props){
       super(props)
       this.state = {
           open:true,
           headingTitle:'Dashboard',
           menuList:this.loadMenuItem(menuItems)
       }
   }

    handleDrawerOpen = () => {
    ///setOpen(true);
    this.setState({open:true})
  };
   handleDrawerClose = () => {
    //setOpen(false);
    //this.setState({open:false})

  };
  onSubMenuClick = (item,index) => {
    this.setState({headingTitle:item.name})
  }

  loadMenuItem = (items=[],isSub=false) => {
    if(isSub)
    return items.map((subItem,index)=> ( <TreeItem key={subItem.id} nodeId={""+subItem.id} label={subItem.name} onClick={() => {this.onSubMenuClick(subItem,index)}}/>))
    return items.map((subItem,index)=> ( <TreeItem key={subItem.id} nodeId={""+subItem.id} label={subItem.name} children={this.loadMenuItem(subItem.submenu,true)}/>))
  }
  

    render(){
        const {open,headingTitle,menuList} = this.state;
        
        const {classes} = this.props
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {headingTitle}
          </Typography>
         
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
        
        {/* add wellsfargo icon */}
        </div>
        <Divider />
        <TreeView
      className={classes.rootBoard}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {menuList}
    </TreeView>
       
       
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container,classes.spaceing}>
          <Grid container xs={12} md={12} lg={12}>
            {/* Chart */}
            <TextField id="outlined-basic" label="Outlined" variant="outlined" /> 
            <Grid item xs={12} md={12} lg={12} >
              <Paper className={fixedHeightPaper,classes.spaceing}>
                {/* <Chart /> */}
                <TableDash/>
              </Paper>
            </Grid>
      
        
          </Grid>
          <Box pt={4}>
            {/* <Copyright /> */}
          </Box>
        </Container>
      </main>
    </div>
        );
    }
}

const drawerWidth = 240;

const useStyles = ((theme) => ({
  root: {
    display: 'flex',
  },
  rootBoard:{
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginLeft:'250px'
  },
  fixedHeight: {
    height: 240,
  },
  spaceing:{
    
  }
}));

export default withRouter(withStyles(useStyles)(DashBoard));