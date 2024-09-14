import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
// import {makeStyles} from '@mui/styles'
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
// import styled from '@emotion/styled';


// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   chatSection: {
//     width: '100%',
//     height: '80vh'
//   },
//   headBG: {
//       backgroundColor: '#e0e0e0'
//   },
//   borderRight500: {
//       borderRight: '1px solid #e0e0e0'
//   },
//   messageArea: {
//     height: '70vh',
//     overflowY: 'auto'
//   }
// });

// const theme = createTheme({
//     table: {
//         minWidth: 650,
//       },
//       chatSection: {
//         width: '100%',
//         height: '80vh'
//       },
//       headBG: {
//           backgroundColor: '#e0e0e0'
//       },
//       borderRight500: {
//           borderRight: '1px solid #e0e0e0'
//       },
//       messageArea: {
//         height: '70vh',
//         overflowY: 'auto'
//       }
//   })

const Chat = () => {
    //   const classes = useStyles();
    const messages = [{ "type": "owner", "time": "09:30", "message": "Hey, Iam Good! What about you ?" }, 
    { "type": "other", "time": "09:31", "message": "Hey, Iam Good! What about you ?" }, 
    { "type": "owner", "time": "10:30", "message": "Cool. i am good, let's catch up!" },
]

    return (
        //   <div style={{height: '100vh'}}>

        <Grid container style={{
            height: '90vh',
        }}>
            <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
                {/* <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <Divider /> */}
                <Grid item xs={12} style={{ padding: '10px' }}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List sx={{ height: "75vh", overflowY: 'auto' }}>
                    {messages.map(message => (
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align={message.type === "owner" ? "right" : "left"} primary={message.message}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align={message.type === "owner" ? "right" : "left"} secondary={message.time}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Grid container style={{ padding: '20px' }}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        //   </div>
    );
}

export default Chat;