import React,{useState,useEffect} from 'react';
import { Paper, Stepper, Step, StepLabel,Typography, CircularProgress,Divider,Button } from '@material-ui/core';

import { commerce } from '../../../lib/commerce';
import useStyle from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps =['Shipping Address','Payment Detailes'];

const Checkout = ({cart}) => {
    const [activeStep, setActiveStep]=useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [ShippingData, setShippingData] = useState({});
    const classes = useStyle();
    const Form = ()=>activeStep===0 ? <AddressForm checkoutToken={checkoutToken} next={next} />:<PaymentForm />
    
    useEffect(()=>{
        const generateToken = async ()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});

                
                setCheckoutToken(token);
            } catch (error) {
                
            }

        }
        generateToken();
    },[cart])    

    const nextStep=()=>setActiveStep((prev)=>prev + 1);
    const backStep=()=>setActiveStep((prev)=>prev - 1);

    const next=(data)=>{
        setShippingData(data);
        nextStep();
    }
    const Confirmation=()=>(<div>conf</div>)
    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep===steps.length?<Confirmation />: checkoutToken && <Form />}
                </Paper>
            </main>
            
        </>
    )
}

export default Checkout
