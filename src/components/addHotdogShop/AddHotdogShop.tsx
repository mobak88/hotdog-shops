import { useState, Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, FormControl } from "@mui/material";
import { SingleShopDataType } from "../../App";
import Typography from "@mui/material/Typography";

type AddHotdogShopType = {
  hotdogShops: SingleShopDataType[];
  setHotdogShops: Dispatch<SetStateAction<SingleShopDataType[]>>;
};

const AddHotdogShop = ({ hotdogShops, setHotdogShops }: AddHotdogShopType) => {
  const [isAddingHotdogShop, setIsAddinghotdogShop] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [newHotdogShop, setNewHotdogShop] = useState<SingleShopDataType>({
    photo: "",
    name: "",
    location: "",
    rating: 2.5,
    id: hotdogShops.length + 2,
    about: "",
    attribution: "",
  });

  const handleIsAddingHotdogShop = () => setIsAddinghotdogShop(true);
  const handleCancelAddHotdogSHop = () => setIsAddinghotdogShop(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setNewHotdogShop((prev) => ({
        ...(prev as SingleShopDataType),
        [name]: file,
      }));
    } else {
      setNewHotdogShop((prev) => ({
        ...(prev as SingleShopDataType),
        [name]: name === "rating" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSubmitCreateNewShop = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !newHotdogShop.photo ||
      newHotdogShop.name.length < 1 ||
      newHotdogShop.location.length < 1 ||
      newHotdogShop.about.length < 1
    ) {
      setErrMsg(true);
      return;
    }

    setErrMsg(false);

    const formData = new FormData();
    formData.append("file", newHotdogShop.photo);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        const url = data.secure_url.split("/");
        const uploadedImageUrl = url[url.length - 1];

        setHotdogShops((prev) => [
          ...prev,
          { ...newHotdogShop, photo: uploadedImageUrl },
        ]);
      } else {
        console.log("Error uploading image:", data);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }

    setIsAddinghotdogShop(false);

    setNewHotdogShop({
      photo: "",
      name: "",
      location: "",
      rating: 2.5,
      id: hotdogShops.length + 2,
      about: "",
      attribution: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {!isAddingHotdogShop && (
        <Button onClick={handleIsAddingHotdogShop} variant="contained">
          Add Hotdog shop
        </Button>
      )}

      {isAddingHotdogShop && (
        <>
          <form onSubmit={handleSubmitCreateNewShop}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Button variant="outlined" component="label">
                Upload shop image
                <input
                  onChange={handleInputChange}
                  type="file"
                  accept="image/*"
                  hidden
                  name="photo"
                />
              </Button>
              <TextField
                onChange={handleInputChange}
                label="Shop Name"
                type="text"
                variant="outlined"
                name="name"
              />
              <TextField
                onChange={handleInputChange}
                label="Shop Location"
                type="text"
                variant="outlined"
                name="location"
              />
              <TextField
                onChange={handleInputChange}
                label="About Shop"
                type="text"
                variant="outlined"
                name="about"
              />
              <TextField
                onChange={handleInputChange}
                name="rating"
                label="Shop Rating"
                type="number"
                inputProps={{ min: 0, max: 10, step: 0.1 }}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Button
                  onClick={handleCancelAddHotdogSHop}
                  sx={{
                    width: "100%",
                  }}
                  variant="outlined"
                >
                  Close
                </Button>
                <Button
                  sx={{
                    width: "100%",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </FormControl>
          </form>
          {errMsg && (
            <Typography color="error">
              Please fill out all fields and upload image
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default AddHotdogShop;
