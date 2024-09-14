import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TableContainer,
  TextField,
} from "@mui/material";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { addItemAction } from "../Redux/actions";
import "./AddItem.css";
import UploadImage from "./UploadImage";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5
};

function AddItem(props) {
  const dispatch = useDispatch();
  const { open, setOpen } = props;
  const [file, setFilename] = useState("");
  const [hasError, sethasError] = useState("");
  const [url, seturl] = useState("");
  const [category, setCategory] = useState("");
  const categoriesInfo = props.data.productReducer?.categories
    ? props.data.productReducer?.categories
    : [];
  const categories = [...categoriesInfo];
  const handleClose = () => {
    setCategory("");
    seturl("");
    setOpen(false);
  };
  useEffect(() => {
    return () => {
      seturl("");
      setCategory(null);
    };
  }, []);

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    setFilename(file);
    seturl(URL.createObjectURL(file));
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },

  };

  const handleSubmit = (event) => {
    sethasError(!category);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    dispatch(
      addItemAction({
        price: data.get("price"),
        name: data.get("item_name"),
        information: data.get("description"),
        image: file,
        categories: category,
        user_id: 1,
      })
    );
    handleClose();
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Modal
      sx={{ zIndex: 500 }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Box sx={{ display: "flex", justifyContent:"flex-end" }}>
              <CloseIcon sx={[{"borderColor":"black", "borderStyle":"solid", "borderRadius":"5px","cursor": 'pointer'}]} onClick={handleClose}/>
          </Box>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Typography component="h1" variant="h5">
                  Add Item
                </Typography> */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="item_name"
                label="Item Name"
                name="item_name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
                autoComplete="current-password"
              />
              <TextField
                name="description"
                required
                id="description"
                label="Description"
                placeholder="In good condition.."
                multiline
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                // rows={2}
                maxRows={4}
              />
              <FormControl required fullWidth sx={{ mt: 2, mb: 2 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category *"
                  MenuProps={MenuProps}
                  onChange={handleCategoryChange}
                  defaultValue={category}
                >
                  {categories.map((category_) => (
                    <MenuItem value={category_.id}>
                      {category_.category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <UploadImage handleFileUpload={handleFileUpload} />
              <Image src={url}></Image>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Item
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    data: state,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(AddItem);

// export function AddItem(props) {
//   const navigate = useNavigate();
//   const { login, authed } = useAuth();
//   const { state } = useLocation();
//   const { open, handleClose } = props;
//   const handleSubmit = (event) => {

//     event.preventDefault();
//     console.log(state?.path, authed)
//     login().then((res) => {
//       console.log(res)
//       console.log(authed)
//       console.log("Login successfull")
//       navigate(state?.path || "/");
//     });
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password")
//     });
//   };

//   return (
//     <Modal
//   open={open}
//   onClose={handleClose}
//   aria-labelledby="modal-modal-title"
//   aria-describedby="modal-modal-description"
// >
// <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center"
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
// </Modal>

//   );
// }
