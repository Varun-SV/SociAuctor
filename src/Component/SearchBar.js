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
import { Button, FormControl, TextField, Select, InputLabel, Autocomplete } from '@mui/material';
import Modal from '@mui/material/Modal';
import { FileUploader } from "react-drag-drop-files";
import currencyJson from '../assets/Common-Currency.json';
import DurationPicker from 'react-duration-picker';

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
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    width: '30%',
    height: '120%',
    overflowY: 'scroll'
  };

const SearchBarWidget = (props)=>{

    const [btn1, setBtn1] = React.useState(null);
    const [btn2, setBtn2] = React.useState(null);
    const filterOptions = ['abc','def'];
    const SortOptions = ['cba','fed'];
    const [openSale, setOpenSale] = React.useState(false);
    const [openAct, setOpenAct] = React.useState(false);
    const fileTypes = ["JPG", "PNG", "JPEG"];
    const [files, setFiles] = React.useState([]);
    const saleCategories = ['Antiques', 'Handicraft', 'Paintings', 'Statues', 'Collectible'];
    const [saleCategory, setSaleCategory] = React.useState("");
    const currencyList = Object.keys(currencyJson);
    const [saleCurrency, setSaleCurrency] = React.useState(currencyList[0]);
    
    const handleOpenSale = () => setOpenSale(true);
    const handleOpenAct = () => setOpenAct(true);
    const handleCloseSale = () => {
        setOpenSale(false);
    }
    const handleCloseAct = () => {
        setOpenAct(false);
    }

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
    
    const handleFileChange = (file) => {
        [...file].map((file_)=>{
            let reader = new FileReader();
            reader.onload = (e) => {
                setFiles(prevState => ([...prevState,e.target.result]));
            };
            reader.readAsDataURL(file_);
        });
      };
    
    const handleSalesCategoryChange = (event) => {
        setSaleCategory(event.target.value);
    }
    
    const handleSalesCurrencyChange = (event) => {
        setSaleCurrency(event.target.value);
    }
    
    const handleDealSubmit = (event) => {
        
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
              onClick={handleOpenSale}
              >{props.additionTitle}</Button>
            <Modal
            open={openSale}
            onClose={handleCloseSale}
            style={{ marginTop: '8%', marginBottom: '20%', height: '65%', width: '100%'}}
            >
                <Box sx={style}>
                  <h1 className="cardTitle">Add Deal</h1>
                  <br/>
                  <form onSubmit={handleDealSubmit}>
                  <Typography>Upload the images of the item (atleast 3 images)</Typography><br/>
                  <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} multiple /><br/>
                  <Grid style={{width: '100%', display: 'flex', overflow: 'scroll', marginBottom: '2%'}}>
                    {
                        files.map((file)=>{
                            return (<img src={file} width='30%' height='30%'/>)
                        })
                    }
                  </Grid>
                  <a href={"#"}
                    onClick={()=>{setFiles([])}}
                    style={{marginBottom: '5px'}}>
                    Clear
                  </a><br/>
                  <TextField
                    name = "saleItemName"
                    placeholder="Item Name"
                    style={{width: '100%', marginTop: '3%'}}
                  /><br/><br/>
                  <FormControl style={{width: '100%'}}>
                      <InputLabel id="deal-category-select-label">Select Category</InputLabel>
                      <Select
                        labelId='deal-category-select-label'
                        label='Select Category'
                        onChange={handleSalesCategoryChange}
                        value={saleCategory}
                      >
                        {saleCategories.map((category)=>{
                            return (<MenuItem value={category} key={category}>
                                <Typography>{category}</Typography>
                            </MenuItem>)
                        })
                        }
                      </Select>
                  </FormControl><br/><br/>
                  <FormControl style={{width:'40%'}}>
                      <InputLabel id="deal-currency-select-label">Select Currency</InputLabel>
                      <Select
                        labelId='deal-currency-select-label'
                        label='Select Currency'
                        onChange={handleSalesCurrencyChange}
                        value={saleCurrency}
                      >
                        {currencyList.map((category)=>{
                            return (<MenuItem value={category} key={category}>
                                <Typography>{category}</Typography>
                            </MenuItem>)
                        })
                        }
                      </Select>
                  </FormControl>
                  <TextField 
                    placeholder='Minimum bid amount' 
                    name='minimumBidAmount'
                    type={'number'}
                    style={{width:'auto'}}/>
                  <br/>
                  <br/>
                  <Typography>Select bid challenge duration</Typography><br/>
                  <DurationPicker
                    initialDuration={{ hours: 1, minutes: 2, seconds: 3 }}
                    maxHours={5}
                  /><br/><br/>
                  <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={['Heart Operation', 'Kidney Surgery']}
                      sx={{ width: '100%', marginTop: '1%' }}
                      renderInput={(params) => <TextField {...params} label="Funding Activity" />}
                  /><br/><br/>
                  <Button type="submit" style={{width: '100%', background: '#142e36', color: 'white', fontSize: '100%'}}>Add Deal</Button>
                  </form>
                </Box>
          </Modal>
        </Box>
    );
}

export default SearchBarWidget;