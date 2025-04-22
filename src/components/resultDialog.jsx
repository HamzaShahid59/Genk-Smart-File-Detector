import React from 'react';
 import {
     Box,
     Typography,
     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Tooltip
 } from '@mui/material';
 import CircleIcon from '@mui/icons-material/Circle';
 
 // Mapping for friendly document names
 const documentTitles = {
     IDCardAttachment: "Validatie van ID-KAART",
     KBORegisterExtract: "Uittreksel van de KBO",
     OfficialGazettePublication: "Bekendmaking in het Belgisch Staatsblad",
     MoralityCertificate: "Bewijs van Goed Zedelijk Gedrag",
     LiabilityInsuranceCopy: "Aansprakelijkheidsverzekering",
     CommercialLeaseAgreement: "Commerciële Huurovereenkomst",
     ElectricCertificate: "Elektriciteitscertificaat"
 };
 
 // Validation key to Dutch message mapping
 const validationMessages = {
     // ID Card
     name_match: "Naam komt niet overeen met aanvrager",
     expiry_valid: "ID kaart is verlopen",
     
     // KBO Register
     company_name_match: "Bedrijfsnaam komt niet overeen",
     company_number_match: "Ondernemingsnummer klopt niet",
     manager_name_match: "Beheerder naam komt niet overeen",
     
     // Morality Certificate
     name_valid: "Naam op certificaat klopt niet",
     date_valid: "Certificaat van goed zeden is verlopen",
     
     // Commercial Lease
     building_owner_match: "Eigenaar pand komt niet overeen",
     restaurant_address_match: "Adres restaurant klopt niet",
     
     // Liability Insurance
     company_name_match: "Verzekeringsmaatschappij naam klopt niet",
     expiry_valid: "ID kaart is verlopen",
     
     // Electric Certificate
     conformity_statement_found: "Conformiteitsverklaring niet gevonden",
     address_match: "Adres op certificaat klopt niet"
 };
 
 // Mapping from PDF check keys to validation result keys
 const validationKeys = {
     IDCardAttachment: "id_card_valid",
     KBORegisterExtract: "kbo_register_valid",
     OfficialGazettePublication: "official_gazette_valid",
     MoralityCertificate: "morality_certificate_valid",
     LiabilityInsuranceCopy: "liability_insurance_valid",
     CommercialLeaseAgreement: "commercial_lease_valid",
     ElectricCertificate: "electric_certificate_valid"
 };
 
 // Determine circle color based on validation status
 const getCircleColor = (docType, validations) => {
     if (docType === 'image' && Object.keys(validations).length === 0) return 'error';
 
     const expirationFields = ['expiry_valid', 'date_valid', 'end_date'];
     const hasExpired = Object.keys(validations).some(key => 
         expirationFields.includes(key) && validations[key] === false
     );
 
     const hasInvalidFields = Object.entries(validations).some(
         ([key, value]) => !expirationFields.includes(key) && value === false
     );
 
     if (hasExpired) return 'warning';
     if (hasInvalidFields) return 'secondary';
     return 'success';
 };
 
 // Get validation messages for tooltip and display
 const getValidationMessages = (docType, validations) => {
     if (docType === 'image' && Object.keys(validations).length === 0) {
         return ['Onleesbaar document'];
     }
 
     const messages = [];
     const expirationFields = ['expiry_valid', 'date_valid', 'end_date'];
 
     Object.entries(validations).forEach(([key, value]) => {
         if (value === false) {
             const message = validationMessages[key] || `Onbekend probleem: ${key}`;
             messages.push(expirationFields.includes(key) ? `Vervallen: ${message}` : message);
         }
     });
 
     return messages.length > 0 ? messages : ['geldig'];
 };
 
 const ValidationResults = ({ result }) => {
     const { pdf_checks, ...restValidations } = result;
 
     return (
         <Box sx={{ mt: 3 }}>
             <Typography variant="h6" gutterBottom>
                 Document Validatie Resultaten
             </Typography>
             <List>
                 {Object.entries(pdf_checks).map(([docKey, docType]) => {
                     const validationKey = validationKeys[docKey];
                     const validations = restValidations[validationKey] || {};
                     const circleColor = getCircleColor(docType, validations);
                     const messages = getValidationMessages(docType, validations);
                     const friendlyName = documentTitles[docKey] || docKey;
 
                     return (
                         <ListItem key={docKey} alignItems="flex-start">
                             <ListItemIcon>
                                 <Tooltip title={messages.join(', ')}>
                                     <CircleIcon sx={{ color: getMuiColor(circleColor) }} />
                                 </Tooltip>
                             </ListItemIcon>
                             <ListItemText
                                 primary={friendlyName}
                                 secondary={
                                     <ul style={{ margin: 0, paddingLeft: 16 }}>
                                         {messages.map((msg, i) => (
                                             <li key={i}>{msg}</li>
                                         ))}
                                     </ul>
                                 }
                             />
                         </ListItem>
                     );
                 })}
             </List>
         </Box>
     );
 };
 
 // Helper to translate color keys into MUI-compatible color strings
 const getMuiColor = (status) => {
     switch (status) {
         case 'success':
             return 'green';
         case 'warning':
             return 'orange';
         case 'secondary':
             return 'goldenrod';
         case 'error':
             return 'red';
         default:
             return 'gray';
     }
 };
 
 export default ValidationResults;