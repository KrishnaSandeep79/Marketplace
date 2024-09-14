import { FavoriteBorder } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Button, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Image } from 'antd';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import "./ComplexCard.css";
import useAuth from "./useAuth";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function RecipeReviewCard(props) {
  const { authed } = useAuth();
  const [interested, setInterested] = React.useState(false);
  // console.log(props.data)
  const { id, created, image, name, information, sellerName, price } = props.data
  const { enqueueSnackbar } = useSnackbar();

  const handleInterestedClick = () => {
    // Make call to backend to show interst for a particular item
    if (!interested) {
      enqueueSnackbar(`Sent message to seller ${sellerName}`)
    }
    setInterested(!interested)
    // setToast(true);
  }

  function parseISOString(s) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(s).toLocaleDateString(undefined, options)
  }

  return (
    <React.Fragment>
      <Card raised sx={{ maxWidth: 345 }} key={id}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {sellerName[0]}
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={`${name}`}
          subheader={`${sellerName}, ${parseISOString(created)}`}
        />
        {/* <Swiper
          grabCursor
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          navigation
          loop
        //  
        >
          <SwiperSlide >
            <CardMedia component="img" height="194" image={image} name={name}/>
          </SwiperSlide>
          {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <CardMedia className={media} image={image} />
                    </SwiperSlide>
                ))}
        </Swiper> */}
         <CardMedia height="194" sx={{width: "100%" }}>
        <Image
          // width={100}
          style={{ height: "194px" }}
          rootClassName="imageCSS"
          // width={200}
          // height={194}
          src={image}
          
          // sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        </CardMedia>
        {/* <CardMedia
        component="img"
        height="194"
        image={image}
        // sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        name={name}
      /> */}
        <CardContent>
          <Typography variant="body2" sx={{maxHeight:80, overflow:"auto"}} color="text.secondary">
            {information}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon startIcon/>
        </IconButton> */}
        {authed &&  <Button startIcon={interested ? <FavoriteIcon /> : <FavoriteBorder />} onClick={handleInterestedClick} aria-label="interest">{interested ? "Intersted" : "Interest"}</Button>}
         

          {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
          <AttachMoneyIcon></AttachMoneyIcon>
          <Typography>{price}</Typography>
          <IconButton aria-label="share" sx={{ marginLeft: "auto" }}>
            <ShareIcon />
          </IconButton>
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, sname and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
      </Card>
      {/* <Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={toast} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      Sent message to seller
    </Alert>
  </Snackbar>
  </Stack> */}
    </React.Fragment>
  );
}