import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

const Search = styled('div')(({ theme,width }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width:width
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'white',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '25ch',
        '&:focus': {
            width: '30ch',
        },
      },
    },
  }));  

const SearchBarWidget = ()=>{

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [filterOptions,setFilterOptions] = ['abc','def'];
    const [SortOptions,setSortOptions] = ['cba','fed'];

    const handleOpenFilter = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenSort = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseFilter = () => {
        setAnchorElUser(null);
    };

    const handleCloseSort = () => {
        setAnchorElUser(null);
    };

    return(
        <Box maxWidth="xl" sx={{ flexGrow: 1 }} style={{backgroundColor:"#142e36"}}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} style={{padding:(5,13)}}>
            <Grid container spacing = {2} style={{height:"max-content",justifyContent:'strech'}} >
                <Grid item>
                    <Search width="100%">
                        <SearchIconWrapper>
                            <SearchIcon style={{color:"white"}}/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                        />
                    </Search>
                </Grid>
                <Grid item display={"inherit"}>
                    <button style={{borderRadius:5,width:100}}>Filter</button>
                </Grid>
                <Grid item display={"inherit"}>
                    <button style={{borderRadius:5,width:100}}>Sort</button>
                </Grid>
            </Grid>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} style={{padding:(3,7)}}>
            <Grid container style={{height:"max-content",justifyContent:'space-around'}} >
                <Grid item>
                    <Search width="max-content">
                        <SearchIconWrapper>
                            <SearchIcon style={{color:"white"}}/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                        />
                    </Search>
                </Grid>
                <Grid item display={"inherit"}>
                    <button style={{borderRadius:5}} onClick={handleOpenFilter}>Filter</button>
                </Grid>
                <Grid item display={"inherit"}>
                    <button style={{borderRadius:5}} onClick={handleOpenSort}>Sort</button>
                </Grid>
            </Grid>
            </Box>
        </Box>
    );
}

export default SearchBarWidget;