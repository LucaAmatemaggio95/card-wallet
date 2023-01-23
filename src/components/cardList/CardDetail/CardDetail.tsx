import { DeleteForever } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import Image from "mui-image";
import { FC, useCallback, useMemo } from "react";
import { CardProps } from "../../../types";
import checkCardExpired from "../../../utils/checkCardExpired";
import { useTheme } from "@mui/material/styles";

const CardDetail: FC<CardProps> = ({ card, handleDeleteCard }): JSX.Element => {
  const theme = useTheme();

  const CardStyle = useMemo(() => {
    return {
      width: "425px",
      maxWidth: "425px",
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.secondary.main}`
    };
  }, [theme]);

  const Logo = (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        src={`../assets/${card.circuit?.toLowerCase()}_logo.png`}
        width={120}
      />
    </Box>
  );

  const isCardExpired = checkCardExpired(card.exp!);

  const handleClick = useCallback(() => {
    handleDeleteCard(card.id);
  }, [card.id, handleDeleteCard]);

  return (
    <Card sx={CardStyle} elevation={1}>
      <CardContent>
        <Typography variant="h5" align="left" gutterBottom>
          {card.Card_Number}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={6}>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"start"}
                >
                  <Typography variant="caption">CVV</Typography>
                  <Typography>{card.cvv}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"start"}
                >
                  <Typography variant="caption">Exp date</Typography>
                  <Typography>{card.exp}</Typography>
                </Box>
              </Grid>
              {isCardExpired && (
                <Grid item xs={12}>
                  <Box mt={2}>
                    <Alert severity="error">This card has expired</Alert>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {Logo}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Tooltip title="Delete card">
          <IconButton color="error" onClick={handleClick}>
            <DeleteForever />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default CardDetail;
