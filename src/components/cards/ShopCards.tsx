import { Dispatch, SetStateAction } from "react";
import ShopCard from "./ShopCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SingleShopDataType } from "../../App";

interface ShopCardsInterface {
  hotdogShops: SingleShopDataType[];
  setIsEditingShop: Dispatch<
    SetStateAction<{ editing: boolean; id: null | number }>
  >;
}

const ShopCards = ({ hotdogShops, setIsEditingShop }: ShopCardsInterface) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        alignItems="center"
        style={{ maxWidth: "1500px" }}
      >
        {hotdogShops.map((shop, i) => (
          <Grid
            item
            key={i}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ShopCard
              setIsEditingShop={setIsEditingShop}
              shopImage={shop.photo}
              shopName={shop.name}
              shopLocation={shop.location}
              shopRating={shop.rating}
              id={shop.id}
              attribution={shop.attribution}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopCards;
