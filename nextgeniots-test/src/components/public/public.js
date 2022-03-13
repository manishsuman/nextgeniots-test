import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import fire from "../../config/firebase";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './public.css';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));
class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      sortValue: "most-recent",
      dialogState:false
    }
  }
  //Change sort dropdown value
  handleSort = (value) => {
    this.setState({ sortValue: value });
  }
  componentDidMount = () => {
    //Fetch data from firebase
    localStorage.setItem("auth",false);
    const listRef = fire.database().ref('todo');
    listRef.on('value', (snapshot) => {
      const list = snapshot.val();
      const listArr = [];
      for (let id in list) {
        listArr.push({ id, ...list[id] });
      }
      this.setState({ todoList: listArr });
    });
  }
  //Delete item
  handleDelete=(key)=>{
    const userRef = fire.database().ref('todo').child(key);
      userRef.remove();
  }
  //Redirect to Creat new page
  handleCreate=()=>{
    localStorage.setItem("auth",true);
    window.location="/create-new";
  }
  render() {
    var listToShow = this.state.todoList;
    var sortValue = this.state.sortValue;
    var handleDelete = this.handleDelete;
    //Sorting
    if (sortValue != '') {
      listToShow = listToShow.sort(function (a, b) {
        if (sortValue == 'ascending') {
          return a['title'].localeCompare(b['title']);
        } else if (sortValue == 'descending') {
          return b['title'].localeCompare(a['title']);
        } else if (sortValue == 'most-recent') {
          return b.timestamp - a.timestamp
        }
      });
    }

    return (
      <React.Fragment>
        <Container className="container" maxWidth="lg">
          <Box className="filter-wrap" style={{ marginTop: 25 }}>
            <Grid container>
              <Grid item xs={6} align="left">
                <Button variant="outlined" startIcon={<Add />} onClick={this.handleCreate}>Create To Do</Button>
              </Grid>
              <Grid item align="right" xs={6}>
                <FormControl >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.sortValue}
                    onChange={(event)=>this.handleSort(event.target.value)}
                  >
                    <MenuItem value="most-recent">Most Recent</MenuItem>
                    <MenuItem value="ascending">Ascending</MenuItem>
                    <MenuItem value="descending">Descending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 4, sm: 5, md: 6 }}>
              {listToShow.map(function (i) {
                return (
                  <Grid container className="listItem" item xs={12} key={i.id} >
                    <Grid item xs={11}>
                      <Item>
                        <Typography align="left" variant="caption" display="block" gutterBottom>
                          Created on {i.date}
                        </Typography>
                       {i.todoDate&&
                        <Typography align="left" variant="caption" display="block" gutterBottom>
                          Due date {i.todoDate}
                        </Typography>
                       }
                        
                        <Typography align="left" variant="h4" gutterBottom component="div">
                          {i.title}
                        </Typography>
                        <Typography align="left" variant="subtitle1" gutterBottom component="div">
                          {i.description}
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid align="right" item xs={1}>
                      <IconButton aria-label="delete" onClick={()=>handleDelete(i.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    )
  }
}

export default (Public);