import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ShopCards from "../cards/ShopCards";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SingleShopDataType } from "../../App";
import { calculateDistance } from "../../helpers/calcDIstance";
import SearchNearbyShops from "../searchNearbySHops/SearchNearbyShops";
import EditHotdogShopForm from "../editHotdogShopForm/EditHotdogShopForm";

export interface HotdogShopType {
  hotdogShops: SingleShopDataType[];
  setHotdogShops: Dispatch<SetStateAction<SingleShopDataType[]>>;
}

export type IsEditingShopType = {
  editing: boolean;
  id: null | number;
};

const Home = ({ hotdogShops, setHotdogShops }: HotdogShopType) => {
  const [nearbyShops, setNearbyShops] = useState<SingleShopDataType[] | []>([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [isEditingShop, setIsEditingShop] = useState<IsEditingShopType>({
    editing: false,
    id: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (searchLocation && searchLocation?.length > 0) {
        const inputResponse = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${searchLocation}&format=json&apiKey=${
            import.meta.env.VITE_GEOAPIFI_API
          }`
        );

        const inputData = await inputResponse.json();
        const inputCoords = [
          inputData.results[0].lat,
          inputData.results[0].lon,
        ];

        const fetchPromises = hotdogShops.map((shop) => {
          return fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${
              shop?.location
            }&format=json&apiKey=${import.meta.env.VITE_GEOAPIFI_API}`
          )
            .then((response) => response.json())
            .then((data) => {
              const distance = calculateDistance(
                inputCoords[0],
                inputCoords[1],
                data.results[0].lat,
                data.results[0].lon
              );

              if (distance < 3) {
                return shop;
              }
            });
        });

        const nearbyShopsData = await Promise.all(fetchPromises);
        const filteredShops = nearbyShopsData.filter(
          Boolean
        ) as SingleShopDataType[];
        setNearbyShops(filteredShops);
      }
    };

    fetchData();
  }, [searchLocation, hotdogShops]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "50px 0px",
      }}
    >
      <Typography variant="h2" color="text.primary">
        Hot Dog stores
      </Typography>
      <SearchNearbyShops
        setNearbyShops={setNearbyShops}
        setSearchLocation={setSearchLocation}
        nearbyShops={nearbyShops}
      />
      {isEditingShop.editing && (
        <EditHotdogShopForm
          hotdogShops={hotdogShops}
          id={isEditingShop.id}
          setIsEditingShop={setIsEditingShop}
          setHotdogShops={setHotdogShops}
        />
      )}
      {nearbyShops.length < 1 && (
        <ShopCards
          hotdogShops={hotdogShops}
          setIsEditingShop={setIsEditingShop}
        />
      )}
      {nearbyShops.length > 0 && (
        <ShopCards
          hotdogShops={nearbyShops}
          setIsEditingShop={setIsEditingShop}
        />
      )}
    </Box>
  );
};

export default Home;
