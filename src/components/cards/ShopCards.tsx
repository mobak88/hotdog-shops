import ShopCard from "./ShopCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { HotdogShopType } from "../pages/Home";

const ShopCards = ({ hotdogShops }: HotdogShopType) => {
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
              shopImage={shop.photo}
              shopName={shop.name}
              shopLocation={shop.location}
              shopRating={shop.rating}
              id={shop.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopCards;
