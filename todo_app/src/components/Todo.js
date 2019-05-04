import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/indigo';

class Todo extends React.Component {
  state = {
    id: this.props.match.params.id,
    title: JSON.parse(localStorage.getItem(this.props.match.params.id)).title,
    status: JSON.parse(localStorage.getItem(this.props.match.params.id)).status,
  };

  renderTodoState = status => {
    if (status==0) {
      return <span>未着手</span>
    } else if(status==1) {
      return <span>進行中</span>
    } else {
      return <span>完了</span>
    }
  }

  changeTitle = title => event => {
    this.setState({ [title]: event.target.value });
    };

  changeStatus = status => event => {
    this.setState({ [status]: event.target.value });
    };

  save = event =>{
    console.log(this.state.title);
    localStorage.setItem(
      this.props.match.params.id,
      JSON.stringify(
        {
          title: this.state.title,
          status: this.state.status
        }
      )
    );
    this.setState();
    this.props.history.push("/todo");
  };
  render(){
    const { classes } = this.props;

    console.log(this.props.match.params.id);
      return(
        <div id='todo'>
        <h2 className={classes.container}>ID: {this.state.id}</h2>
        <form className={classes.container} noValidate autoComplete="off">
        <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
          Title
          </InputLabel>
        <TextField
          id="standard-name"
          className={classes.textField}
          value={this.state.title}
          onChange={this.changeTitle('title')}
          margin="normal"
        />
        <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
          Status
          </InputLabel>
        <Select
            value={this.state.status}
            onChange={this.changeStatus('status')}
            name="Status"
            className={classes.selectEmpty}
          >
            {/* <MenuItem value={this.state.status}>
            {this.renderTodoState(this.state.status)}
            </MenuItem> */}
            <MenuItem value={0}>未着手</MenuItem>
            <MenuItem value={1}>進行中</MenuItem>
            <MenuItem value={2}>完了</MenuItem>
          </Select>
        </form>

        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="button"
        onClick={this.save}
      >
        Save
      </Button>
        </div>
      );
    }
  }
  
Todo.propTypes = {
classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  container: {
    margin: 50,
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
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  label: {
    margin: 20,
    color: "indigo",
  },
  button: {
    marginLeft: 50,
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
});

export default withStyles(styles)(Todo);
