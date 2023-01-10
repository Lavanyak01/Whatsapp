import { Skeleton, Stack } from '@mui/material'
import React from 'react'

function ChatLoading() {
  return (
    <Stack spacing={1}>
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
        <Skeleton variant='reactangular' width={300} height={50} />
    </Stack>
  )
}

export default ChatLoading