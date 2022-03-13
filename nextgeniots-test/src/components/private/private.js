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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
;
class Private extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      error: "false",
      open: false,
      todoDate: Moment(new Date()).format("yyyy-MM-DD")
    }
  }
  componentDidMount = () => {
    ///Check auth value from localstorage
    if (localStorage.getItem("auth") == "false") {
      window.location = "/";
    }
    localStorage.setItem("auth", false);
  }

  //Get form title value
  handleTitle = (value) => {
    this.setState({ title: value });
    if (value.length > 0) {
      this.setState({ error: "false" });
    }
  }
  handleDateChange = (newValue) => {
    this.setState({ todoDate: newValue });
  };
  //Get form description value
  handleDescription = (value) => {
    this.setState({ description: value });
  }
  //Save data to Firebase
  handleSubmit = () => {
    const listRef = fire.database().ref('todo');
    const dueDate=Moment(new Date(this.state.todoDate)).format("DD/MM/YYYY");
    if (this.state.title != "") {
      const itemData = {
        title: this.state.title,
        description: this.state.description,
        date: Moment(new Date()).format('DD/MM/YYYY'),
        todoDate:dueDate,
        timestamp: Math.floor(Date.now() / 1000)
      }
      listRef.push(itemData);
      //Reset Form values
      this.setState({
        open: true,
        title: "",
        description: "",
        todoDate:Moment(new Date()).format("yyyy-MM-DD")
      });
    }
  }
  // Close alert
  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <React.Fragment>
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
                  required
                  value={this.state.title}
                  onChange={(e) => this.handleTitle(e.target.value)}
                />
              </Grid>
              <Grid className="listItem" item xs={12} >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={this.state.todoDate}
                  onChange={this.handleDateChange}
                  renderInput={(params) => <TextField style={{width: "100%"}} {...params} />}
                />
                </LocalizationProvider>
              </Grid>
              <Grid className="listItem" item xs={12} >
                <TextField
                  id="filled-multiline-flexible"
                  label="Description"
                  multiline
                  minRows={6}
                  value={this.state.description}
                  onChange={(e) => this.handleDescription(e.target.value)}
                  variant="outlined"
                  className='description'
                />
              </Grid>
              <Grid item lg={12}>
                <Button className="submit" variant="contained" size="large" onClick={this.handleSubmit} disabled={!this.state.title} >Submit</Button>
              </Grid>
              <Grid item lg={12}>
                <Link href="/" underline="hover">
                  Back
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
            Form submit successfully!
          </Alert>
        </Snackbar>
      </React.Fragment>
    )
  }
}
export default (Private);