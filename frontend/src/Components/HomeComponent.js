import { CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Empty } from "antd";
import { Fragment } from "react";
import { connect } from "react-redux";
import RecipeReviewCard from "./ComplexCard";
import "./HomeComponent.css";


function HomeComponent(props) {
    const data = props.data?.productList ? props.data?.productList : [] 
    
    const isLoading = props.data?.isLoading
    // useEffect(()=>{
    //     dispatch(fetchList({"value": "", "category": 0 }));
    // }, [])

    // const data = [
    //     { id: 1, price:"10", title: "shoe", sellerName: "Andy", subheader: "September 14, 2016", image: "https://mui.com/static/images/cards/paella.jpg", alt: "shoe", cardContent: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like." },
    //     { id: 2, price:"20",title: "shoe", sellerName: "Woody", subheader: "September 14, 2016", image: "https://images.pexels.com/photos/5214139/pexels-photo-5214139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "shoe", cardContent: "an outer covering for your foot that usually has a stiff bottom part called a sole with a thicker part called a heel attached to it and an upper part that covers part or all of the top of your foot and an upper part that covers part or all of the top of your foot and an upper part that covers part or all of the top of your foot" },
    //     { id: 3, price:"30",title: "shoe", sellerName: "Rex", subheader: "September 14, 2016", image: "https://mui.com/static/images/cards/paella.jpg", alt: "shoe", cardContent: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like." },
    //     { id: 4, price:"40",title: "shoe", sellerName: "Woody", subheader: "September 14, 2016", image: "https://mui.com/static/images/cards/paella.jpg", alt: "shoe", cardContent: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like." },
    //     { id: 5, price:"50", title: "shoe", sellerName: "Woody", subheader: "September 14, 2016", image: "https://mui.com/static/images/cards/paella.jpg", alt: "shoe", cardContent: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like." },
    // ]
    if(isLoading){
        return (
            <Box sx={{ top: '50%', left: "50%", position: "fixed" }}>
            <CircularProgress />
            </Box>
        )
    }
    else{
        if (data.length === 0){
            return (
                <Fragment>
                <Empty className="noData"/>
                </Fragment>
            )
        }
        else{
        return (
            <Fragment>
                <Grid
                    container
                    spacing={2}
                    justifyContent="space-evenly"
                    direction="row"
                    flex={1}
                    style={{
                        margin: 0,
                        width: '100%',
                    }}
                    justify="flex-start"
                    alignItems="flex-start"
                    sx={{ p: '2rem' }}
                >
                    {data.map(elem => (
                        <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
                            <RecipeReviewCard data={elem} />
                        </Grid>
                    ))}
                </Grid>
    
            </Fragment>
        )}
    }
    
}

function mapStateToProps(state){
    return {
        "data": state.productReducer,
    }
}

export default connect(mapStateToProps)(HomeComponent)