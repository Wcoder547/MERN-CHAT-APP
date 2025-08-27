import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import React, { memo } from 'react'

const UserItem = ({user,handler,handlerIsLoading}) => {

    const {name,_id,avatar} = user
  return (
  <ListItem>
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} justifyContent={"space-between"}>
       <Avatar src={avatar} alt={name} />
       <Typography variant="body1"
       sx={{ flexGrow: 1, display: '-webkit-flex', WebkitLineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
       >{name}</Typography>  

       <IconButton
       size='small'
       sx={{bgcolor: 'primary.main', color:'white', '&:hover': { bgcolor: 'primary.dark' }}}
       onClick={() => handler(_id)} disabled={handlerIsLoading}>
        <AddIcon />
       </IconButton>
    </Stack>
  </ListItem>
  )
}

export default memo(UserItem)