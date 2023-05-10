import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import ShopMap from "../shopMap/ShopMap";

type SingleShopDataType = {
  photo: string;
  name: string;
  location: string;
  rating: number;
  id: number;
  about: string;
};

type HotdogShopType = {
  hotdogShops: SingleShopDataType[];
};

const HotdogStore = ({ hotdogShops }: HotdogShopType) => {
  const [hotdogShop, setHotdogShop] = useState<null | SingleShopDataType>(null);
  const { id } = useParams();

  useEffect(() => {
    const filteredHotdogShop = hotdogShops.find(
      (shop) => shop.id.toString() === id
    );

    setHotdogShop(filteredHotdogShop || null);
  }, [hotdogShops, id]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={hotdogShop?.photo}
          alt=""
          style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
        />
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "50px 0px",
          }}
        >
          <Typography variant="h2" color="text.primary">
            {hotdogShop?.name}
          </Typography>
          <Rating
            name="half-rating-read"
            value={hotdogShop?.rating || null}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2" color="text.secondary">
            {hotdogShop?.about}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hotdogShop?.location}
          </Typography>
        </Box>
      </Box>
      <ShopMap about={hotdogShop?.about} coords={[51.505, -0.09]} />
    </>
  );
};

export default HotdogStore;
