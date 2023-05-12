import { Dispatch, SetStateAction, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { LoggedInContext } from "../../App";

type ShopCardType = {
  shopImage: string;
  shopName: string;
  shopLocation: string;
  shopRating: number;
  id: number;
  setIsEditingShop: Dispatch<
    SetStateAction<{ editing: boolean; id: null | number }>
  >;
};

const ShopCard = ({
  shopImage,
  shopName,
  shopLocation,
  shopRating,
  id,
  setIsEditingShop,
}: ShopCardType) => {
  const { isLoggedIn } = useContext(LoggedInContext);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      event.preventDefault();
      event.stopPropagation();
      setIsEditingShop({ id: id, editing: true });
    }
  };

  return (
    <Link
      href={`/store/${id}`}
      sx={{
        maxWidth: 345,
        height: "100%",
        width: "100%",
        textDecoration: "none",
      }}
    >
      <Card>
        <CardMedia
          sx={{ height: 160 }}
          image={`https://res.cloudinary.com/dwpshizth/image/upload/c_fit,h_320,w_690/${shopImage}`}
          title={`Image of ${shopName}`}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "column",
                flexDirection: "column",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                lineHeight={1}
                marginBottom={0}
              >
                {shopName}
              </Typography>
              <Rating
                name="half-rating-read"
                value={shopRating ?? 0}
                precision={0.5}
                readOnly
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {shopLocation}
            </Typography>
          </Box>
        </CardContent>
        {isLoggedIn && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardActions>
              <Button
                onClick={handleButtonClick}
                variant="outlined"
                size="small"
              >
                Edit
              </Button>
            </CardActions>
          </Box>
        )}
      </Card>
    </Link>
  );
};

export default ShopCard;
