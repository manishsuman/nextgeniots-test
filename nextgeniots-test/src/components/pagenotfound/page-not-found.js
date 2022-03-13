import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));
class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      sortValue: "most-recent",
      dialogState:false
    }
  }
 
  render() {
    return (
      <React.Fragment>
        <Container className="container" maxWidth="lg">
          <Box className="filter-wrap" style={{ marginTop: 25 }}>
            <Grid container>
            <Grid item xs={12} align="left">
            <Typography align="center" variant="h1" gutterBottom component="div">
                          Page Not Found
                        </Typography>
              </Grid>
              <Grid item xs={12} align="center">
              <Link href="/" underline="hover">
                Home
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    )
  }
}

export default (PageNotFound);