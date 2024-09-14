import styled from "@emotion/styled";
import { Box, Divider, Fade, Grid, List, ListItem, ListItemText, Paper, Popper, Typography } from "@mui/material"
import React, { Fragment } from "react";

function generate(element) {
    return [0, 1, 2,3,4].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  
const Demo = styled('div')(({ theme }) => ({
backgroundColor: theme.palette.background.paper,
}));

export function NotificationComponent(props){
    const {openPopper, anchorPopperEl} = props;
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const data = ["dad","das", "dasd","dasd","dasdsa"]
    return (
        <Popper open={openPopper}  anchorEl={anchorPopperEl} placement='bottom-end' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
                
            >
            <Paper sx={{width:320, maxHeight:440, overflow:"auto"}}>
                <List dense={dense}  >
                    {
                        data.map(elem => (
                            <Fragment>
                            <ListItem>
                            <ListItemText
                                primary="Single-line item, helo world djsnsnksnk jsknkjsnkjsnsjndjsnkjs sjkndsbfjnlkassdjb jsbfjkvsj "
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            </ListItem>
                            <Divider/>
                            </Fragment>
                        ))
                    }
                    {/* {generate(
                        <div>
                        <ListItem>
                        <ListItemText
                            primary="Single-line item, helo world djsnsnksnk jsknkjsnkjsnsjndjsnkjs sjkndsbfjnlkassdjb jsbfjkvsj "
                            secondary={secondary ? 'Secondary text' : null}
                        />
                        </ListItem>
                        <Divider/>
                        </div>
                    )} */}
                </List>
            </Paper>
            </Box>
            {/* </Paper> */}
          </Fade>
        )}
      </Popper>)
}