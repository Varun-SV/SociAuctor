import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';

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

const SearchBarWidget = (props)=>{

    const [btn1, setBtn1] = React.useState(null);
    const [btn2, setBtn2] = React.useState(null);
    const filterOptions = ['abc','def'];
    const SortOptions = ['cba','fed'];

    const handleOpenFilter = (event) => {
        setBtn1(event.currentTarget);
    };

    const handleOpenSort = (event) => {
        setBtn2(event.currentTarget);
    };

    const handleCloseFilter = () => {
        setBtn1(null);
    };

    const handleCloseSort = () => {
        setBtn2(null);
    };

    return(
        <Box maxWidth="xxl" sx={{ flexGrow: 1 }} style={{backgroundColor:"#142e36", display: 'flex', justifyContent: 'space-evenly'}}>
            <div>
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
                            <button style={{borderRadius:5,width:100,border:"white"}}  onClick={handleOpenFilter}>Filter</button>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={btn1}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(btn1)}
                            onClose={handleCloseFilter}
                            >
                                <MenuItem key="abc" onClick = {handleCloseFilter}>
                                    <Typography textAlign="center">
                                        <Checkbox />Abc
                                    </Typography>
                                </MenuItem>
                                <MenuItem key="abc1" onClick = {handleCloseFilter}>
                                    <Typography textAlign="center">
                                        <Checkbox />Abc1
                                    </Typography>
                                </MenuItem>
                                <MenuItem key="abc2" onClick = {handleCloseFilter}>
                                    <Typography textAlign="center">
                                        <Checkbox />Abc2
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item display={"inherit"}>
                            <button style={{borderRadius:5,width:100,border:"white"}}  onClick={handleOpenSort}>Sort</button>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={btn2}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(btn2)}
                            onClose={handleCloseSort}
                            >
                                <MenuItem key="def" onClick = {handleCloseSort}>
                                    <Typography textAlign="center">
                                        <Checkbox />DEF
                                    </Typography>
                                </MenuItem>
                                <MenuItem key="def1" onClick = {handleCloseSort}>
                                    <Typography textAlign="center">
                                        <Checkbox />DEF1
                                    </Typography>
                                </MenuItem>
                            </Menu>
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
                            <button style={{borderRadius:5,border:"white"}} onClick={handleOpenFilter}>Filter</button>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={btn1}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(btn1)}
                            onClose={handleCloseFilter}
                            >
                                <MenuItem key="abc" onClick = {handleCloseFilter}>
                                    <Typography textAlign="center">
                                        <Checkbox />Abc
                                    </Typography>
                                </MenuItem>
                                <MenuItem key="abc1" onClick = {handleCloseFilter}>
                                    <Typography textAlign="center">
                                        <Checkbox />Abc1
                                    </Typography>
                                </MenuItem>
                                <MenuItem key="abc2" onClick = {handleCloseFilter}>
                                    <Typography textAlign="center">
                                        <Checkbox />Abc2
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item display={"inherit"}>
                        <button style={{borderRadius:5,border:"white"}}  onClick={handleOpenSort}>Sort</button>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={btn2}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(btn2)}
                            onClose={handleCloseSort}
                            >
                                <MenuItem key="def" onClick = {handleCloseSort}>
                                    <Typography textAlign="center">
                                        <Checkbox />DEF
                                    </Typography>
                                </MenuItem>
                                <MenuItem key="def1" onClick = {handleCloseSort}>
                                    <Typography textAlign="center">
                                        <Checkbox />DEF1
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <Button
              style={{background: 'white', color: '#142e36', marginBottom: '1%', marginTop: '1%'}}
              >{props.additionTitle}</Button>
        </Box>
    );
}

export default SearchBarWidget;