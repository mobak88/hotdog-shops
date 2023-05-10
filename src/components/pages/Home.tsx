import ShopCards from "../cards/ShopCards";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home = () => {
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
      <ShopCards />
    </Box>
  );
};

export default Home;
