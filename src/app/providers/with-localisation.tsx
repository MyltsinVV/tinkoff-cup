import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import React from 'react'

export const withLocalisation = (component: () => React.ReactNode) => () => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    {component()}
  </LocalizationProvider>
)