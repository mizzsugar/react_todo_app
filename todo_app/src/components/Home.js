import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TodoTable from './Table'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginTop: 50,
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
        marginTop: 50,
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
  });

let todoList = []
for(let i=0; i<localStorage.length; i++){
  let id = localStorage.key(i)
  let todo =JSON.parse(localStorage.getItem(id)).title
  let status = JSON.parse(localStorage.getItem(id)).status
  todoList.push(
    {id: id, title: todo, status:status }
  )
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'something to do',
      rows: todoList,
      page: 0,
      rowsPerPage: 5
    };
  }

  handleChange = name => event => {
  this.setState({ [name]: event.target.value });
  };

  addTodo = event => {
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

  delete = (event, id) => {
    localStorage.removeItem(event);
    // let todoList = []
    // for(let i=0; i<localStorage.length; i++){
    //   let id = localStorage.key(i)
    //   let todo = localStorage.getItem(id)
    //   todoList.push(
    //     {id: id, title: todo, status:0 }
    //   )
    // }
    //this.setState({rows: todoList});
  }

  render(){
    const { classes } = this.props;

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
              <Fab
              color="primary"
              size="medium"
              aria-label="Add"
              className={classes.fab}
              onClick={this.addTodo}
              >
                  <AddIcon />
              </Fab>
          </form>
          <TodoTable
          rows={this.state.rows}
          delete={this.delete('id')}
          page={this.state.page}
          rowsPerPage={this.state.rowsPerPage}
          />
        </div>
      );
    }
  }
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  
export default withStyles(styles)(Home);
