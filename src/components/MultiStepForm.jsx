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
    'Identificatie',
    'Vennootschap of éénmanszaak',
    'Bijlagen',
    'Overzicht en verzending',
];
const FileUpload = ({ label, name, acceptedFileType, file, onFileChange, error }) => {
    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            onFileChange(name, { error: true });
        } else {
            onFileChange(name, selectedFile);
        }
    };

    return (
        <label htmlFor={name}>
            <input
                accept={acceptedFileType}
                style={{ display: 'none' }}
                id={name}
                type="file"
                onChange={handleFileSelect}
            />
            <Button
                component="span"
                variant="outlined"
                sx={{
                    p: 2,
                    border: '2px dashed',
                    borderColor: error ? '#ff0000' : '#00515D',
                    width: '100%',
                    height: 100,
                    '&:hover': {
                        borderColor: '#003941',
                        backgroundColor: 'rgba(0, 81, 93, 0.04)'
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         style={{ color: error ? '#ff0000' : '#00515D' }}>
                        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
                    </svg>
                    <Typography variant="body1" sx={{ color: error ? '#ff0000' : '#00515D' }}>
                        {file?.name || `Upload ${label}`}
                    </Typography>
                    {file && !file.error && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                             style={{ color: '#00C853', marginLeft: 8 }}>
                            <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
                        </svg>
                    )}
                </Box>
            </Button>
        </label>
    );
};

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
                                <Grid item size={{ xs: 12 }}>
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
        case 3:
            return (
                <Container maxWidth="lg">
                    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mt: 2 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Vennootschap of éénmanszaak
                        </Typography>

                        <FormControl component="fieldset" required fullWidth sx={{ mb: 4 }}>
                            <FormLabel component="legend">Duid aan wat van toepassing is.</FormLabel>
                            <RadioGroup
                                row
                                value={formData.businessStructure || ''}
                                onChange={(e) => handleChange('businessStructure', e.target.value)}
                            >
                                <FormControlLabel
                                    value="sole"
                                    control={<Radio />}
                                    label="Het gaat om een éénmanszaak"
                                />
                                {/* <FormControlLabel
                                    value="single-manager"
                                    control={<Radio />}
                                    label="Het gaat om een vennootschap en er is maar 1 zaakvoerder"
                                /> */}
                                <FormControlLabel
                                    value="multiple-managers"
                                    control={<Radio />}
                                    label="Het gaat om een vennootschap en er zijn zaakvoerders"
                                />
                            </RadioGroup>
                        </FormControl>

                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Gegevens vennootschap
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            Vul hier de gegevens aan van de maatschappelijke zetel
                        </Typography>

                        <Grid container spacing={2}>
                            {[
                                ['Ondernemingsnummer', 'companyNumber'],
                                ['Naam vennootschap', 'companyName'],
                                ['Straat maatschappelijke zetel', 'companyStreet'],
                                ['Huisnummer maatschappelijke zetel', 'companyHouseNumber'],
                                ['Postcode maatschappelijke zetel', 'companyPostalCode'],
                                ['Gemeente maatschappelijke zetel', 'companyCity'],
                            ].map(([label, name]) => (
                                <Grid item size={{xs:12 , md : 6}} key={name}>
                                    <TextField
                                        required
                                        fullWidth
                                        label={label}
                                        value={formData[name] || ''}
                                        onChange={(e) => handleChange(name, e.target.value)}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {['single-manager', 'multiple-managers'].includes(formData.businessStructure) && (
                            <Box mt={4}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    {formData.businessStructure === 'single-manager'
                                        ? 'Gegevens zaakvoerder'
                                        : 'Gegevens zaakvoerders'}
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    {formData.businessStructure === 'single-manager'
                                        ? 'Vul hier de gegevens aan van de zaakvoerder.'
                                        : 'Vul hier de gegevens aan van de zaakvoerders.'}
                                </Typography>

                                {(formData.managers || []).map((manager, index) => (
                                    <Box key={index} sx={{ mb: 4, border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Zaakvoerder {index + 1}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {[
                                                ['Voornaam', 'firstName'],
                                                ['Achternaam', 'lastName'],
                                                ['Straatnaam', 'street'],
                                                ['Huisnummer', 'houseNumber'],
                                                ['Postcode', 'postalCode'],
                                                ['Gemeente', 'city'],
                                                ['Land', 'country'],
                                            ].map(([label, field]) => (
                                                <Grid item size={{xs:12 , md : 6}} key={field}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        label={label}
                                                        value={manager[field] || ''}
                                                        onChange={(e) => {
                                                            const updatedManagers = [...(formData.managers || [])];
                                                            updatedManagers[index] = {
                                                                ...updatedManagers[index],
                                                                [field]: e.target.value
                                                            };
                                                            handleChange('managers', updatedManagers);
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                            <Grid item size={{xs:12 , md : 6}}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Geboortedatum"
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={manager.birthDate || ''}
                                                    onChange={(e) => {
                                                        const updatedManagers = [...(formData.managers || [])];
                                                        updatedManagers[index] = {
                                                            ...updatedManagers[index],
                                                            birthDate: e.target.value
                                                        };
                                                        handleChange('managers', updatedManagers);
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        {formData.businessStructure === 'multiple-managers' && index !== 0 && (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => {
                                                    const updatedManagers = formData.managers.filter((_, i) => i !== index);
                                                    handleChange('managers', updatedManagers);
                                                }}
                                                sx={{ mt: 2 }}
                                            >
                                                Verwijderen
                                            </Button>
                                        )}
                                    </Box>
                                ))}

                                {formData.businessStructure === 'multiple-managers' && (
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            const newManager = {
                                                firstName: '',
                                                lastName: '',
                                                street: '',
                                                houseNumber: '',
                                                postalCode: '',
                                                city: '',
                                                birthDate: '',
                                                country: ''
                                            };
                                            handleChange('managers', [...(formData.managers || []), newManager]);
                                        }}
                                        sx={{ mt: 2, bgcolor: '#00515D', '&:hover': { bgcolor: '#003941' } }}
                                    >
                                        Zaakvoerder toevoegen
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Box>
                </Container>
            );
            case 4:
                return (
                    <Container maxWidth="lg">
                        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mt: 2 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Document(en) selecteren
                            </Typography>
            
                            {[
                                {
                                    label: 'Bijlage Identiteitskaart',
                                    name: 'idCard',
                                    english: 'IDCardAttachment'
                                },
                                {
                                    label: 'Uittreksel KBO',
                                    name: 'kboExtract',
                                    english: 'KBORegisterExtract'
                                },
                                {
                                    label: 'Vennootschap: publicatie(s) Belgisch Staatsblad',
                                    name: 'officialJournal',
                                    english: 'OfficialGazettePublication'
                                },
                                {
                                    label: 'Moraliteitsattest',
                                    name: 'moralityCertificate',
                                    english: 'MoralityCertificate'
                                },
                                {
                                    label: 'Kopie verzekering Objectieve Aansprakelijkheid',
                                    name: 'liabilityInsurance',
                                    english: 'LiabilityInsuranceCopy'
                                },
                                {
                                    label: 'Handelshuurovereenkomst (Indien je geen eigenaar bent)',
                                    name: 'leaseAgreement',
                                    english: 'CommercialLeaseAgreement'
                                },
                                {
                                    label: 'Elektriciteitscertificaat',
                                    name: 'electricCertificate',
                                    english: 'ElectricCertificate'
                                },
                            ].map((doc) => (
                                <Box key={doc.name} sx={{ mb: 3 }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {doc.label} <span style={{ color: '#ff0000' }}>*</span>
                                    </Typography>
                                    <FileUpload 
                                        label={doc.label}
                                        name={doc.english}
                                        acceptedFileType="application/pdf"
                                        file={formData[doc.english]}
                                        onFileChange={handleFileChange}
                                        error={!!formData[doc.english]?.error}
                                    />
                                    {formData[doc.english]?.error && (
                                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                            Alleen PDF-bestanden zijn toegestaan
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Container>
                );
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
        }
        else if(activeStep === 5){
            const formPayload = new FormData();
            
            // Append all form data
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'managers') {
                    formPayload.append(key, JSON.stringify(value));
                } else if (value instanceof File) {
                    formPayload.append(key, value);
                } else {
                    formPayload.append(key, value);
                }
            });
        
            // Add verification for PDFs
            const pdfFields = [
                'IDCardAttachment',
                'KBORegisterExtract',
                'OfficialGazettePublication',
                'MoralityCertificate',
                'LiabilityInsuranceCopy',
                'CommercialLeaseAgreement',
                'ElectricCertificate'
            ];
            
            pdfFields.forEach(field => {
                if (formData[field]) {
                    formPayload.append(field, formData[field]);
                }
            });
        
            // Proper way to inspect FormData contents
            console.log('Final Payload Data:');
            for (const [key, value] of formPayload.entries()) {
                console.log(key, value instanceof File ? value.name : value);
            }
        }  else {
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

    // const handleFileChange = (field, file) => {
    //     setFormData((prev) => ({ ...prev, [field]: file }));
    // };

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
        if (activeStep === 3) {
            // Check company details
            const companyFields = [
                'companyNumber', 'companyName', 'companyStreet',
                'companyHouseNumber', 'companyPostalCode', 'companyCity'
            ];
            if (!companyFields.every(field => formData[field]?.trim())) return false;
    
            // Check business structure selection
            if (!formData.businessStructure) return false;
    
            // Check managers if needed
            if (formData.businessStructure !== 'sole') {
                const managers = formData.managers || [];
                if (managers.length === 0) return false;
                
                const requiredManagerFields = [
                    'firstName', 'lastName', 'street', 'houseNumber',
                    'postalCode', 'city', 'birthDate', 'country'
                ];
                
                for (const manager of managers) {
                    if (!requiredManagerFields.every(field => manager[field]?.trim())) {
                        return false;
                    }
                }
    
                if (formData.businessStructure === 'single-manager' && managers.length !== 1) {
                    return false;
                }
            }
    
            return true;
        }
        if (activeStep === 4) {
            const requiredDocs = [
                'IDCardAttachment',  // Changed from idCardAttachment
                'KBORegisterExtract', // Changed from kboRegisterExtract
                'OfficialGazettePublication', // Changed from officialGazettePublication
                'MoralityCertificate', // Changed from moralityCertificate
                'LiabilityInsuranceCopy', // Changed from liabilityInsuranceCopy
                'CommercialLeaseAgreement', // Changed from commercialLeaseAgreement
                'ElectricCertificate' // Changed from electricCertificate
            ];
        
            return requiredDocs.every(doc => 
                formData[doc] && 
                formData[doc] instanceof File && 
                formData[doc].type === 'application/pdf' &&
                !formData[doc].error
            );
        }
    
        return true;
    };

    const handleFileChange = (field, file) => {
        setFormData(prev => {
            // Clear previous error if valid file is selected
            if (file && file.type === 'application/pdf') {
                return { ...prev, [field]: file };
            }
            return { ...prev, [field]: file };
        });
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

                    {getStepContent(activeStep, subStep, formData, handleChange, handleFileChange)}

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
                            disabled={!canProceed() || activeStep === steps.length}
                            sx={{ bgcolor: '#00515D', '&:hover': { bgcolor: '#003941' } }}
                        >
                            {activeStep === steps.length-1 ? "Rapport ophalen" : "Volgende"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
