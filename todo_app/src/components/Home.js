import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TodoTable from './Table'

const styles = theme => ({
    container: {
      margin: 20,
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    fab: {
        margin: theme.spacing.unit * 2,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
  });

  

class Home extends React.Component {
    state = {
        name: 'something to do',
      };
    // let todoList = []
    // for(let i=0; i<localStorage.length; i++){
    //   let id = localStorage.key(i)
    //   let todo =JSON.parse(localStorage.getItem(id)).title
    //   let status = JSON.parse(localStorage.getItem(id)).status
    //   todoList.push(
    //     {id: id, title: todo, status:status }
    //   )
    // }
    
    handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    };

    delete = id=> event => {
      console.log('aaaaaaaaaaaaaaaaa');
      localStorage.removeItem(id);
      this.forceUpdate();
      
    }

    save = name => event => {
      let max = 1;
      for(let i=0; i<=localStorage.length; i++){
        let id = parseInt(localStorage.key(i));
        if (id > max){
          max = id;
        }
      }
      max += 1;
      localStorage.setItem(
        max,
        JSON.stringify(
          {
            title: this.state.name,
            status: 0
          }
        )
      )
      this.forceUpdate()
    }

    render(){
      const { classes } = this.props;
      let todoList = []
      for(let i=0; i<localStorage.length; i++){
        let id = localStorage.key(i)
        let todo =JSON.parse(localStorage.getItem(id)).title
        let status = JSON.parse(localStorage.getItem(id)).status
        todoList.push(
          {id: id, title: todo, status:status }
        )
      }

      return(
        <div id='todo'>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                id="standard-name"
                label="Title"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                />
                <Fab color="primary" size="medium" aria-label="Add" className={classes.fab}>
                    <AddIcon onClick={this.save(this.state.name)}/>
                </Fab>
            </form>
            <TodoTable rows={todoList} delete={this.delete}/>
        </div>
      );
    }
  }
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  
export default withStyles(styles)(Home);
