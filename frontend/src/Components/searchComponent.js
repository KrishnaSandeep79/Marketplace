import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import debounce from 'lodash.debounce';
import { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchList } from "../Redux/actions";
import { Search, SearchIconWrapper, StyledInputBase, StyledSelect } from "./customStylings";
// import "./Home.css"

function SearchComponent(props) {
    const categoriesInfo = props.data?.categories ? props.data?.categories : []
    const categories = [{ "category": "All Categories", "id": 0 }, ...categoriesInfo]
    const [category, setCategory] = useState(0);
    const [search, setSearch] = useState("");
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
      },
    };
    const success = props.data?.success ? props.data?.success : false
    useEffect(()=>{
        dispatch(fetchList({"value": search, "category": category }));
    }, [success])
    const emitChangeDebounced = debounce(emitChange, 250);
    const dispatch = useDispatch();
    //   const [search, setSearch] = useState(["All"]);
    const searchProducts = (event) => {
        emitChangeDebounced(event.target.value);
    }
    function emitChange(value) {
        setSearch(value)
        dispatch(fetchList({"value": value, "category": category}));
    }
    useEffect(() => {
        return () => {
            emitChangeDebounced.cancel();
        }
    }, [])

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        dispatch(fetchList({"value": search, "category": event.target.value}));
    }


    return (
        <Fragment>
        <FormControl sx={{ marginLeft: "24px" }}>
            <InputLabel id="demo-simple-select-label" sx={[
              {
                '&.Mui-focused': {
                  color: 'white',
                },
                color: "white"
              }]}>Category</InputLabel>
            <StyledSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              MenuProps={MenuProps}
              onChange={handleCategoryChange}
              defaultValue={category}
            >
              {categories.map(category_ => (<MenuItem value={category_.id}>{category_.category}</MenuItem>))}
            </StyledSelect>
          </FormControl>
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                onChange={searchProducts}
                // value={search}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        </Fragment>
    );
};

function mapStateToProps(state){
    return {
        "data": state.productReducer,
    }
  }
  

export default connect(mapStateToProps)(SearchComponent)