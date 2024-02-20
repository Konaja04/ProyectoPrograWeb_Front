import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { TextField } from '@mui/material';

export default function CreditCardCustom() {
    return (
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '100%',
                mx: 'auto',
                // to make the demo resizable
                overflow: 'auto',
                resize: 'horizontal',
            }}
        >
            <Divider inset="none" />
            <CardContent
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                    gap: 1.5,
                }}
            >
                <TextField>
                    <FormLabel>Card number</FormLabel>
                    <Input endDecorator={<CreditCardIcon />} />
                </TextField>
                <TextField>
                    <FormLabel>Expiry date</FormLabel>
                    <Input endDecorator={<EventIcon />} />
                </TextField>
                <TextField>
                    <FormLabel>CVC/CVV</FormLabel>
                    <Input endDecorator={<InfoOutlinedIcon />} />
                </TextField>
                <TextField>
                    <FormLabel>Card holder name</FormLabel>
                    <Input endDecorator={<PersonIcon />} placeholder="Enter cardholder's full name" />
                </TextField>
                <CardActions sx={{ gridColumn: '1/-1' }}>
                    <Button variant="solid" color="primary">
                        Add card
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}