import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
//import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import logo from '../logo4.png'
import { useState, useEffect } from 'react';

const pages = [{name: 'HomePage', url: '/'}, {name: 'About Us', url: '/aboutus'}, {name: 'Recipes', url: '/recipes'}, {name: 'Ingredients', url: '/ingredients'}];
const settings = [{name: 'Registration', url: '/registration'}, {name: 'Login', url: '/login'}];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElRecipes, setAnchorElRecipes] = React.useState(null);
  const [ categories, setCategories ] = useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCategoriesMenu = (event) => {
    setAnchorElRecipes(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCategoriesMenu = () => {
    setAnchorElRecipes(null);
  };

  useEffect(()=>{
      var axios = require('axios');

      var config = {
          method: 'get',
          url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
          headers: { }
        };

      axios(config)
      .then(function (response) {
        const slicedArray = response.data.categories;
        const transformedData = slicedArray.map((category) => {
          return { name: category.strCategory}
        });
        setCategories(transformedData);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [])


  const handleMouseEnter = (event, name) =>{
    if (name === "Recipes")
    {
      handleOpenCategoriesMenu(event);
    }
  }

  return (
    <AppBar position="static" >
      <Container maxWidth="l" id="appBar">
        <Toolbar disableGutters >
          <Link href="/" underline="none">
          <img src={logo} alt="logo" className="App-logo"></img>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={page.url} underline="none">
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  onMouseEnter={(event) => handleMouseEnter(event, page.name)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
                {
                  (page.name === "Recipes") ? 
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar3"
                    anchorEl={anchorElRecipes}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElRecipes)}
                    onClose={handleCloseCategoriesMenu}
                    onMouseLeave={handleCloseCategoriesMenu}
                  >
                    
                  <Container maxWidth="l" id="appBar">
                    {categories.map((category) => (
                      <MenuItem key={category.name} >
                        <Link href={`/recipes/${category.name}`} color="white" underline="none">
                        <Typography textAlign="center">{category.name}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
                    </Container>
                  </Menu> : ""
                }
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Link href={setting.url} underline="none">
                  <Typography textAlign="center">{setting.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
