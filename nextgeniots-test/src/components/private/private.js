import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import fire from "../../config/firebase";
import TextField from '@mui/material/TextField';
import Moment from 'moment';
import './private.css';
import Link from '@mui/material/Link';
class Private extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    }
  }
  componentDidMount = () => {
    if (localStorage.getItem("auth") == "false") {
      window.location = "/";
    }
    localStorage.setItem("auth", false);
  }

  //Handle form title value
  handleTitle = (value) => {
    this.setState({ title: value });
  }

  //Handle form description value
  handleDescription = (value) => {
    this.setState({ description: value });
  }

  handleSubmit = () => {
    const listRef = fire.database().ref('todo');
    const itemData = {
      title: this.state.title,
      description: this.state.description,
      date: Moment(new Date()).format('DD/MM/YYYY'),
      timestamp: Math.floor(Date.now() / 1000)
    }
    listRef.push(itemData);
  }
  render() {
    const authState=localStorage.getItem("auth");
    console.log("authState",authState);
    return (
      <React.Fragment>
        {authState =="true" ?
        <Container className="container" maxWidth="sm">
        <Stack spacing={2} direction="row">
          <Typography className="form-title" variant="h4" gutterBottom component="div">
            Create ToDo
          </Typography>
        </Stack>
        <Box className="form" sx={{ flexGrow: 1 }}>
          <Grid container rowSpacing={4} columnSpacing={{ xs: 4, sm: 5, md: 6 }}>
            <Grid className="listItem" item xs={12} >
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                className="title"
                onChange={(e) => this.handleTitle(e.target.value)}
              />
            </Grid>
            <Grid className="listItem" item xs={12} >
              <TextField
                id="filled-multiline-flexible"
                label="Description"
                multiline
                minRows={6}
                onChange={(e) => this.handleDescription(e.target.value)}
                variant="outlined"
                className='description'
              />
            </Grid>
            <Grid item lg={12}>
              <Button className="submit" variant="contained" size="large" onClick={this.handleSubmit}>Submit</Button>
            </Grid>
            <Grid item lg={12}>
              <Link href="/" underline="hover">
                Back
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
        :""}
        
      </React.Fragment>
    )
  }
}
export default (Private);