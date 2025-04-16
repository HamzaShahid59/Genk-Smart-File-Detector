import React, { useState } from 'react';
import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    Typography,
    Checkbox,
    FormControlLabel,
    TextField,
    Grid,
    Container,
    ThemeProvider,
    createTheme,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel
} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00515D',
        },
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#ff0000'
                }
            }
        }
    }
});

const steps = [
    'Toestemming',
    'Aard van de aanvraag',
    'Identification',
    'Partnership or sole proprietorship',
    'Attachments',
    'Overview and Shipping',
];

function getStepContent(step, subStep, formData, handleChange, handleFileChange) {
    switch (step) {
        case 0:
            return (
                <Container maxWidth="md">
                    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Toestemming
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            Zonder uw toestemming kunnen wij uw verzoek niet verwerken.{' '}
                            <span style={{ color: '#ff0000' }}>*</span>
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={formData.permission || false}
                                    onChange={(e) => handleChange('permission', e.target.checked)}
                                />
                            }
                            label={
                                <Typography>
                                    Ik geef toestemming dat mijn gegevens gebruikt worden om mijn aanvraag te kunnen verwerken
                                    <span style={{ color: '#ff0000' }}>*</span>
                                </Typography>
                            }
                        />
                    </Box>
                </Container>
            );
        case 1:
            return (
                <Container maxWidth="lg">
                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, mt: 2 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Aard van de aanvraag
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            Geef hieronder aan over wat voor soort uitbating het gaat. Bijvoorbeeld:
                            café, hotel, hotel-restaurant, frituur, taverne, kebabzaak, broodjeszaak,...
                        </Typography>

                        <Grid container spacing={2}  >
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Soort uitbating"
                                    value={formData.businessType || ''}
                                    onChange={(e) => handleChange('businessType', e.target.value)}
                                />
                            </Grid>

                            {[
                                ['Aanvragen nieuwe uitbating?', 'newEstablishment'],
                                ['Alcohol schenken?', 'alcohol'],
                                ['Feestzaal / discotheek?', 'eventHall'],
                                ['Geluid 85dB(A)LAeq, 15min?', 'loudMusic'],
                                ['Afhaalzaak?', 'takeaway']
                            ].map(([label, name]) => (
                                <Grid item size={{ xs: 12, md: 6 }} key={name}>
                                    <FormControl component="fieldset" required fullWidth>
                                        <FormLabel component="legend">{label}</FormLabel>
                                        <RadioGroup
                                            row
                                            value={formData[name] || ''}
                                            onChange={(e) => handleChange(name, e.target.value)}
                                        >
                                            <FormControlLabel value="Ja" control={<Radio />} label="Ja" />
                                            <FormControlLabel value="Nee" control={<Radio />} label="Nee" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            );

        case 2:
            if (subStep === 0) {
                return (
                    <Container maxWidth="lg">
                        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mt: 2 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Identificatie
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Naam zaak"
                                        value={formData.businessName || ''}
                                        onChange={(e) => handleChange('businessName', e.target.value)}
                                    />
                                </Grid>

                                <Grid item size={{ xs: 12 }}>
                                    <Grid container spacing={2}>
                                        <Grid item size={{ xs: 12, md: 6 }} >
                                            <TextField
                                                required
                                                fullWidth
                                                label="Straat in Genk"
                                                value={formData.street || ''}
                                                onChange={(e) => handleChange('street', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item size={{ xs: 12, md: 6 }} >
                                            <TextField
                                                required
                                                fullWidth
                                                label="Huisnummer zaak"
                                                value={formData.houseNumber || ''}
                                                onChange={(e) => handleChange('houseNumber', e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="E-mailadres"
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                );
            }
            else {
                return (
                    <Container maxWidth="lg">
                        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mt: 2 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Identificatie uitbater
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Voornaam"
                                        value={formData.firstName || ''}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                    />
                                </Grid>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Achternaam"
                                        value={formData.lastName || ''}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                    />
                                </Grid>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Straatnaam"
                                        value={formData.streetName || ''}
                                        onChange={(e) => handleChange('streetName', e.target.value)}
                                    />
                                </Grid>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Huis- en busnummer"
                                        value={formData.houseBusNumber || ''}
                                        onChange={(e) => handleChange('houseBusNumber', e.target.value)}
                                    />
                                </Grid>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Postcode"
                                        value={formData.postalCode || ''}
                                        onChange={(e) => handleChange('postalCode', e.target.value)}
                                    />
                                </Grid>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Gemeente"
                                        value={formData.city || ''}
                                        onChange={(e) => handleChange('city', e.target.value)}
                                    />
                                </Grid>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="GSM-nummer"
                                        type="tel"
                                        value={formData.phone || ''}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                    />
                                </Grid>
                                <Grid item  size={{ xs: 12}}>
                                    <FormControl component="fieldset" required fullWidth>
                                        <FormLabel component="legend">
                                            Is de uitbater al dan niet de eigenaar van het exploitatiepand?
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            value={formData.isOwner || ''}
                                            onChange={(e) => handleChange('isOwner', e.target.value)}
                                        >
                                            <FormControlLabel
                                                value="owner"
                                                control={<Radio />}
                                                label="De uitbater is ook de eigenaar van het pand"
                                            />
                                            <FormControlLabel
                                                value="not-owner"
                                                control={<Radio />}
                                                label="De uitbater is niet de eigenaar van het pand"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                {formData.isOwner === 'not-owner' && (
                                    <>
                                        <Grid item size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Voor en achternaam eigenaar of vennootschap"
                                                value={formData.ownerName || ''}
                                                onChange={(e) => handleChange('ownerName', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Adres (straat, nummer) of zetel"
                                                value={formData.ownerAddress || ''}
                                                onChange={(e) => handleChange('ownerAddress', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Postcode"
                                                value={formData.ownerPostalCode || ''}
                                                onChange={(e) => handleChange('ownerPostalCode', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Gemeente"
                                                value={formData.ownerCity || ''}
                                                onChange={(e) => handleChange('ownerCity', e.target.value)}
                                            />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Box>
                    </Container>
                );
            }

        default:
            return null;
    }
}
export default function MultiStepForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [subStep, setSubStep] = useState(0);

    // const handleNext = () => {
    //     if (!canProceed()) return;
    //     console.log(`Form data after Step ${activeStep + 1}:`, formData);
    //     setActiveStep((prev) => prev + 1);
    // };
    const handleNext = () => {
        if (!canProceed()) return;

        if (activeStep === 2) {
            if (subStep === 0) {
                setSubStep(1);
            } else {
                setActiveStep((prev) => prev + 1);
            }
        } else {
            setActiveStep((prev) => prev + 1);
        }
        console.log(`Form data after Step ${activeStep + 1}:`, formData);

    };


    // const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleBack = () => {
        if (activeStep === 2 && subStep === 1) {
            setSubStep(0);
        } else {
            setActiveStep((prev) => prev - 1);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (field, file) => {
        setFormData((prev) => ({ ...prev, [field]: file }));
    };

    // const canProceed = () => {
    //     if (activeStep === 0) return formData.permission === true;

    //     if (activeStep === 1) {
    //         const required = ['businessType', 'newEstablishment', 'alcohol', 'eventHall', 'takeaway'];
    //         return required.every((field) => !!formData[field]);
    //     }

    //     if (activeStep === 2) {
    //         const required = ['businessName', 'street', 'houseNumber', 'email'];
    //         return required.every((field) => !!formData[field]?.trim());
    //     }

    //     return true;
    // };

    const canProceed = () => {
        if (activeStep === 0) return formData.permission === true;

        if (activeStep === 1) {

            const required = ['businessType', 'newEstablishment', 'alcohol', 'eventHall', 'takeaway'];
            return required.every((field) => !!formData[field]);

        }

        if (activeStep === 2) {
            if (subStep === 0) {
                const required = ['businessName', 'street', 'houseNumber', 'email'];
                return required.every((field) => !!formData[field]?.trim());
            }
            else {
                const requiredBase = ['firstName', 'lastName', 'streetName', 'houseBusNumber',
                    'postalCode', 'city', 'phone', 'isOwner'];
                const isValidBase = requiredBase.every(field =>
                    formData[field] !== undefined && formData[field] !== null && String(formData[field]).trim() !== ''
                );

                if (!isValidBase) return false;

                if (formData.isOwner === 'not-owner') {
                    const requiredOwner = ['ownerName', 'ownerAddress', 'ownerPostalCode', 'ownerCity'];
                    return requiredOwner.every(field =>
                        formData[field] !== undefined && formData[field] !== null && String(formData[field]).trim() !== ''
                    );
                }
                return true;
            }
        }

        return true;
    };


    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh' }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 1, sm: 3 } }}>
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconProps={{ sx: { color: '#00515D' } }}>
                                    <Typography variant="body2" sx={{ color: '#00515D' }}>
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {getStepContent(activeStep,subStep, formData, handleChange, handleFileChange)}

                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            sx={{ bgcolor: '#00515D', '&:hover': { bgcolor: '#003941' } }}
                        >
                            Terug
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={!canProceed() || activeStep === steps.length - 1}
                            sx={{ bgcolor: '#00515D', '&:hover': { bgcolor: '#003941' } }}
                        >
                            Volgende
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
