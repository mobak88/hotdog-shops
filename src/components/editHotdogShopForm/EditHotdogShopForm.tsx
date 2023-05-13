import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, FormControl } from "@mui/material";
import { SingleShopDataType } from "../../App";
import { IsEditingShopType } from "../pages/Home";

type EditHotdogShopForm = {
  hotdogShops: SingleShopDataType[];
  id: number | null;
  setIsEditingShop: Dispatch<SetStateAction<IsEditingShopType>>;
  setHotdogShops: Dispatch<SetStateAction<SingleShopDataType[]>>;
};

const EditHotdogShopForm = ({
  hotdogShops,
  id,
  setIsEditingShop,
  setHotdogShops,
}: EditHotdogShopForm) => {
  const [hotdogShop, setHotdogShop] = useState<null | SingleShopDataType>(null);

  useEffect(() => {
    const filteredHotdogShop = hotdogShops.find((shop) => shop.id === id);

    setHotdogShop(filteredHotdogShop || null);
  }, [hotdogShops, id]);

  const handleCloseForm = () =>
    setIsEditingShop((prev) => ({ ...prev, editing: false }));

  const handleDeleteShop = () => {
    if (hotdogShops && setHotdogShops) {
      setHotdogShops((prev) => prev.filter((shop) => shop.id !== id));
      setIsEditingShop((prev) => ({ ...prev, editing: false }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHotdogShop((prev) => ({
      ...(prev as SingleShopDataType),
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hotdogShops) {
      const newShops: SingleShopDataType[] = [...hotdogShops];
      setHotdogShops(
        newShops.map((shop) => {
          if (shop.id === id) {
            return { ...(hotdogShop as SingleShopDataType) };
          } else {
            return shop;
          }
        })
      );
      setIsEditingShop((prev) => ({ ...prev, editing: false }));
    }
  };

  return (
    <>
      {hotdogShop && (
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Shop Name"
              type="text"
              variant="outlined"
              value={hotdogShop.name}
              name="name"
              onChange={handleInputChange}
            />
            <TextField
              label="Shop Location"
              type="text"
              variant="outlined"
              value={hotdogShop.location}
              name="location"
              onChange={handleInputChange}
            />
            <TextField
              label="About Shop"
              type="text"
              variant="outlined"
              value={hotdogShop.about}
              name="about"
              onChange={handleInputChange}
            />
            <TextField
              name="rating"
              label="Shop Rating"
              type="number"
              inputProps={{ min: 0, max: 10, step: 0.1 }}
              value={hotdogShop.rating}
              onChange={handleInputChange}
            />
            <Button
              sx={{
                width: "100%",
              }}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                width: "100%",
              }}
            >
              <Button
                onClick={handleDeleteShop}
                color="error"
                sx={{
                  width: "100%",
                }}
                variant="contained"
              >
                Delete
              </Button>
              <Button
                onClick={handleCloseForm}
                sx={{
                  width: "100%",
                }}
                variant="outlined"
              >
                Close
              </Button>
            </Box>
          </FormControl>
        </form>
      )}
    </>
  );
};

export default EditHotdogShopForm;
