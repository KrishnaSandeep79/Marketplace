import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Select from '@mui/material/Select';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape?.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
export const StyledSelect = styled(Select)`
  height: 45px;
  width: 100%;
  color: white;
  & .MuiOutlinedInput-notchedOutline {
    border-color: white
  };
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: white
  };
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: white;
    border-width: 2px
  };
  // & > fieldset {
  //   border-color: white;
  // };
  & > svg {
    color: white;
  }
  `;
  
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      }
    },
  }));