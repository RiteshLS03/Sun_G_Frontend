import  { useState } from 'react';
import './style.css';

import img1 from '../../../assets/images/thumbnail-1.jpg';
import img2 from '../../../assets/images/thumbnail-1.jpg';
import img3 from '../../../assets/images/thumbnail-1.jpg';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TopProducts = (props) => {

    const [open, setOpen] =useState(false);
    const [city, setCity] = useState(true)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <>
            <div className='topSelling_box'>
                <h3>{props.title}</h3>

                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src={img1} className='w-100' onClick={handleClickOpen}/>
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>Lorem ipsum dolor sit amet consectetur.</h4></Link>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>$28.85</span> <span className='oldPrice'>$32.8</span>
                        </div>
                    </div>
                </div>


                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src={img1} className='w-100' onClick={handleClickOpen} />
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>Lorem ipsum dolor sit amet consectetur.</h4></Link>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>$28.85</span> <span className='oldPrice'>$32.8</span>
                        </div>
                    </div>
                </div>


                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src={img1} className='w-100' onClick={handleClickOpen}/>
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>Lorem ipsum dolor sit amet consectetur.</h4></Link>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>$28.85</span> <span className='oldPrice'>$32.8</span>
                        </div>
                    </div>
                </div>




            </div>

            <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Sunglory Vegetables</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}


          <TextField
            autoFocus
            required
            margin="dense"
            id="city"
            name="city"
            label="Enter City Name"
            type="text"
            fullWidth
            // variant="standard"
          /> 
      
        </DialogContent>
  
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant='contained'>Submit</Button>
        </DialogActions> 
      </Dialog> 
        </>

    )
}

export default TopProducts;