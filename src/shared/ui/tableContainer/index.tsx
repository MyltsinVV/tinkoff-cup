import {TableContainer as MuiTableContainer, TableContainerProps as MuiTableContainerProps} from '@mui/material'
import React, {forwardRef, ForwardRefRenderFunction} from 'react'
import './styles.scss'

const TableContainerRef: ForwardRefRenderFunction<HTMLDivElement, MuiTableContainerProps> = ({
  children,
  className,
  ...rest
}, ref) => {
  return (
    <MuiTableContainer
      className={`override-table-container ${className}`}
      {...rest}
      ref={ref}
    >
      {children}
    </MuiTableContainer>
  )
}

export const TableContainer = forwardRef(TableContainerRef)