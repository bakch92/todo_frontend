import { Paper, List, Container, 
  AppBar, Toolbar, Typography, Grid, Button } from '@mui/material';
import React, { Component } from 'react'
import AddTodo from './AddTodo';
import { call,signout } from './ApiService';
import Todo from './Todo';
import LoadingPage from './LoadingPage';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) => 
    this.setState({items: response.data, loading: false}));
  }
 
  add = (item) => {
    call("/todo", "POST", item).then((response) =>
    this.setState({itmes: response.data}))
    window.location.href="/";
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
    this.setState({items: response.data}))
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) => (
    this.setState({items: response.data})))
  }

  

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item,idx) => (
            <Todo item={item} key={item.id} items={this.state.items} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
            <Button color="inherit" onClick={signout}>로그아웃</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )

    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth='md'>
          <AddTodo add={this.add} />
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );


    var content = (
      <LoadingPage />
    );

    if(!this.state.loading) {
      content = todoListPage;
    }

    return (
      <div className='App'>
        {content}
      </div>
    )
  }
}