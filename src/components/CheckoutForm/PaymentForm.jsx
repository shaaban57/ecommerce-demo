import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
const PaymentForm = () => {
    return (
        <div>
            <Typography>sorry , there isn't any payment method available here.</Typography>
            <br/>
            <br/>
            <Button component={Link} to="/cart" variant="contained" color="primary">back</Button>
        </div>
    )
}

export default PaymentForm
