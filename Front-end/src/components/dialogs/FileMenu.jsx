import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({ anchorEl }) => {
  return (
   <Menu  anchorEl={anchorEl}   onClose={() => {}}>
     <div style={{
        width: "10rem",
     }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe neque recusandae porro?</div>
    </Menu>
  )
}

export default FileMenu