import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import toast from "react-hot-toast";



const NewGroup = ({ open, onClose }) => {
  const [isLoadingNewGroup, setIsLoadingNewGroup] = useState(false);

  const groupName = useInputValidation("");

  const [members, setMembers] = useState(sampleUsers);

  const [createGroup, { isLoading: isCreatingGroup }] = useState();

  const [selectedMembers, setSelectedMembers] = useState([]);


  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers)

  const submitHandler = async () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select At least 3 Members");

    try {
      setIsLoadingNewGroup(true);

      await createGroup({
        name: groupName.value,
        members: selectedMembers,
      }).unwrap();

      toast.success("Group created successfully!");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create group");
    } finally {
      setIsLoadingNewGroup(false);
    }
  };

  const closeHandler = () => {
    onClose?.();
  };

  return (
    <Dialog onClose={closeHandler} open>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant="body1">Members</Typography>

        <Stack>
          {members?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup || isCreatingGroup}
          >
            {isCreatingGroup || isLoadingNewGroup ? "Creating..." : "Create"}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
