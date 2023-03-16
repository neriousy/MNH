import React, {useState, useRef} from 'react';
import styles from './SearchForm.module.scss';
import { search } from '../../../hooks/useUserInfo';
import SearchResultGrid from '../SearchResult/SearchResultGrid/SearchResultGrid';
import { TextField, Box, Select, MenuItem, Button, FormControlLabel, Checkbox, FormControl, InputLabel, Grid, Pagination, RadioGroup, Radio, FormLabel } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';


function SearchForm(){
  const [data, setData] = useState([]);
  const [useAdvancedFilters, setUseAdvancedFilters] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [gridView, setGridView] = useState(1);
  const gridRef = useRef(null);
  const listRef = useRef(null);



  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);



  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  const handlePostPerPage = (e) => {
    setPostsPerPage(e.target.value);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setData(await search(JSON.parse(window.localStorage.getItem('user'))['token']));
  };

  const showFilters = () => {
    setUseAdvancedFilters(prev => !prev);
  };

  const switchView = (e) => {
    
    
  };


  return(
    <>
      <div className={styles.formContainer}>
        <Box component="form" sx={{width: '90%', display: 'flex', justifyContent:'center'}}>
          <FormControl sx={{width: '100%', display: 'flex', justifyContent:'center'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}} xs={5}>
              <TextField sx={{width: '25%', background: 'rgb(255, 255, 255, 255)', m:1}} InputProps={{style: {fontSize: '1em', color:'#000', background: '#fff'}}} placeholder='Miasto' variant='filled'/>

              <TextField type="number" sx={{width: '15%', background: 'rgb(255, 255, 255, 255)', m:1}} InputProps={{style: {fontSize: '1em', color:'#000', background: '#fff'}}} placeholder='Wiek od' variant='filled'/>

              <TextField type="number" sx={{width: '15%', background: 'rgb(255, 255, 255, 255)', m:1}} InputProps={{style: {fontSize: '1em', color:'#000', background: '#fff'}}} placeholder='Wiek do' variant='filled'/>

              <FormControl  sx={{width: '30%', m:1}}>
                <InputLabel id="gender">Płeć</InputLabel>
                <Select
                  sx={{background: 'rgba(255, 255, 255, 255)'}}
                  labelId="gender"
                  id="gender"
                  defaultValue=''
                >
                  <MenuItem value="M">Mężczyzna</MenuItem>
                  <MenuItem value="K">Kobieta</MenuItem>
                  <MenuItem value="O">Obojętnie</MenuItem>
                </Select>
              </FormControl>
            </Box>


            {useAdvancedFilters === true ? 
              <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                <FormControlLabel sx={{color: '#000'}} control={<Checkbox sx={{border: '#fff'}}/>} labelPlacement="start" label="Osoba pracująca" />
                <FormControlLabel sx={{color: '#000'}} control={<Checkbox />} labelPlacement="start" label="Status studenta" />
                <FormControlLabel sx={{color: '#000'}} control={<Checkbox />} labelPlacement="start" label="Nie pije alkoholu" />
                <FormControlLabel sx={{color: '#000'}} control={<Checkbox />} labelPlacement="start" label="Nie pali papierosów" />
              </Box>
              : <></>
            }
          

            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
              <Button sx={{ mt: 3, mb: 2, width: '40%' }} variant="contained" type="button" onClick={showFilters}>{useAdvancedFilters === true ? 'Schowaj filtry zaawansowane' : 'Pokaz filtry zaawansowane'}</Button>
              <Button sx={{ mt: 3, mb: 2, width: '40%' }} variant="contained" type="submit" onClick={handleSubmit}>Wyszukaj</Button>
            </Box>
          </FormControl>
        </Box>
      </div>

      {data.length !==0 ? 
        <Box sx={{width: '70%'}}>
          <Box sx={{height: '100%', width: '30%',display: 'flex', justifyContent: 'flexStart', alignItems: 'center' ,background: 'rgba(255, 255, 255, 0.9)'}}>
            <FormControl sx={{display: 'flex', justifyContent: 'center'}}>
              <FormLabel sx={{display: 'flex', justifyContent: 'center', textDecoration: 'underline', color:'#000'}} id="post-per-page">Ilość postów na strone</FormLabel>
              <RadioGroup
                row
                aria-labelledby="post-per-page"
                name="position"
                defaultValue="top"
                sx={{display: 'flex', justifyContent: 'center'}}
                onChange={handlePostPerPage}
              >
                <FormControlLabel
                  value={6}
                  control={<Radio />}
                  label="6"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value={9}
                  control={<Radio />}
                  label="9"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value={12}
                  control={<Radio />}
                  label="12"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>

            <Box sx={{display: 'flex', justifyConten: 'center', alignItems: 'center'}}>
              <ListIcon sx={{height: '2.5em', width:'auto', m:1, color:'#444', '&:hover':{color:'#000', cursor: 'pointer'}}} onClick={switchView} ref={listRef} />
              <GridViewIcon sx={{height: '2.3em', width:'auto', m:1, color:'#444', '&:hover':{color:'#000', cursor: 'pointer'}}} onClick={switchView} ref={gridRef} />

            </Box>
          </Box>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Pagination sx={{background: 'rgba(255, 255, 255, 0.9)', margin: '1em', display: 'flex', justifyContent: 'center'}} count={Math.ceil(data.length / postsPerPage)} variant="outlined" shape="rounded" onChange={handlePage} />
            <Grid container spacing={{ xs: 2}} columns={{ xs: 4, sm: 8, md: 12 }} sx={{height: 'auto', width: '100%'}}>
              {currentPosts.map((user, index) => (<Grid key={index} item xs={2} sm={4} md={4}> <SearchResultGrid  data={user}/> </Grid>))}
            </Grid>
          </Box>
        </Box> : <> </>}
      

      

    </>
  );
}

export default SearchForm;