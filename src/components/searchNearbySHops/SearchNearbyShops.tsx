import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SingleShopDataType } from "../../App";

type SearchNearbySHopsType = {
  setSearchLocation: (input: string) => void;
  setNearbyShops: (arr: []) => void;
  nearbyShops: SingleShopDataType[];
};

const SearchNearbyShops = ({
  setSearchLocation,
  setNearbyShops,
  nearbyShops,
}: SearchNearbySHopsType) => {
  const [userInput, setUserInput] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (nearbyShops.length > 0) {
      setErrMsg(false);
      setIsSearching(true);
    } else if (nearbyShops.length < 1 && userInput.length > 0) {
      setErrMsg(true);
    }
    // Ignoring next line, if userInput is included as a dependancy the err msg gets fired when it shouldnt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearbyShops.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleUserSearch = () => {
    setSearchLocation(userInput);
    if (userInput.length < 1) {
      setErrMsg(true);
    }
  };

  const handleClearSearch = () => {
    setNearbyShops([]);
    setErrMsg(false);
    setUserInput("");
    setSearchLocation("");
    setIsSearching(false);
  };

  return (
    <Stack gap={2} direction="column">
      <Stack gap={2} direction={{ sm: "column", md: "row" }}>
        <TextField
          value={userInput}
          id="outlined-basic"
          label="Search nearby shops"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleUserSearch}>
          Search
        </Button>
        {isSearching && (
          <Button onClick={handleClearSearch} variant="outlined">
            Show all
          </Button>
        )}
      </Stack>
      {errMsg && (
        <Typography color="error">
          No results try a diffferent search
        </Typography>
      )}
    </Stack>
  );
};

export default SearchNearbyShops;
