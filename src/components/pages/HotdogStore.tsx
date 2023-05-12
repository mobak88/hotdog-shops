import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import ShopMap from "../shopMap/ShopMap";
import { SingleShopDataType } from "../../App";

type HotdogShopType = {
  hotdogShops: SingleShopDataType[];
};

const HotdogStore = ({ hotdogShops }: HotdogShopType) => {
  const [hotdogShop, setHotdogShop] = useState<null | SingleShopDataType>(null);
  const [shopCoords, setShopCoords] = useState<null | [number, number]>(null);
  const { id } = useParams();

  useEffect(() => {
    const filteredHotdogShop = hotdogShops.find(
      (shop) => shop.id.toString() === id
    );

    setHotdogShop(filteredHotdogShop || null);
  }, [hotdogShops, id]);

  useEffect(() => {
    if (hotdogShop?.location) {
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${
          hotdogShop?.location
        }&format=json&apiKey=${import.meta.env.VITE_GEOAPIFI_API}`
      )
        .then((response) => response.json())
        .then((data) => {
          setShopCoords([data.results[0].lat, data.results[0].lon]);
        });
    }
  }, [hotdogShop]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "1500px",
          }}
        >
          <img
            src={`https://res.cloudinary.com/dwpshizth/image/upload/${hotdogShop?.photo}`}
            alt=""
            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
          />
          <Box
            sx={{
              width: "100%",
              maxWidth: "1500px",
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
          {shopCoords && (
            <ShopMap about={hotdogShop?.about} coords={shopCoords} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default HotdogStore;
