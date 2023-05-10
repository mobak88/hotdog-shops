import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
type ShopCardType = {
  shopImage: string;
  shopName: string;
  shopLocation: string;
  shopRating: number;
  id: number;
};

const ShopCard = ({
  shopImage,
  shopName,
  shopLocation,
  shopRating,
  id,
}: ShopCardType) => {
  return (
    <Link
      href={`/books/${id}`}
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
          image={shopImage}
          title="green iguana"
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
                defaultValue={shopRating}
                precision={0.5}
                readOnly
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {shopLocation}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShopCard;
