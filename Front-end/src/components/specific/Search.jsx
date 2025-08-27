import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useInputValidation} from "6pp"
import { Search as searchIcon } from '@mui/icons-material'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'



const Search = () => {
    const search = useInputValidation("")
    const [users,setIsusers] = useState(sampleUsers)
    let isLoadingFriendRequest = false;
    const addFriendHandler = (id)=>{
      console.log(id)
    }
  return (
    <>
    <Dialog open>
      <Stack spacing={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          placeholder="Search..."
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          inputProps={{
          startAdornment: (
              <InputAdornment position="start">
                <searchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem  user={user} key={user.id} handler={addFriendHandler} handlerIsLoading={isLoadingFriendRequest} />
          ))}
        </List>
      </Stack>
    </Dialog>
    </>
  )
}

export default Search
