import { Box } from '@mui/material'
import MultiStepForm from '../components/MultiStepForm'
import Genklogo from '/Genk.png'

export default function Home() {
  return (
    <div style={{ margin: 0, padding: '2rem' }}>
      <Box sx={{
        maxWidth: 1200,
        mx: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <img src={Genklogo} alt='Genk logo'
          height={41.2} width={100} />

      </Box>
      <MultiStepForm />
    </div>
  )
}
