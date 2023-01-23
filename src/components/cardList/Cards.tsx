import { useCallback, useEffect, useMemo, useState } from "react";
import useAxios from "axios-hooks";
import { CardElement } from "../../types";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  Toolbar
} from "@mui/material";
import CardDetail from "./CardDetail/CardDetail";
import Navbar from "../Navbar/Navbar";
import checkCardExpired from "../../utils/checkCardExpired";
import { Add } from "@mui/icons-material";
import { deleteCard } from "../../utils/api";
import { useTheme } from "@mui/material/styles";

const Cards = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const AddButtonStyle = useMemo(() => {
    return {
      position: "fixed",
      bottom: theme.spacing(8),
      right: theme.spacing(8)
    };
  }, [theme]);

  const [totalCards, setTotalCards] = useState<number>(0);
  const [validCards, setValidCards] = useState<CardElement[]>([]);

  const [{ data: cardsData, loading }, getCardsRequest] = useAxios<
    CardElement[]
  >({
    url: "http://localhost:3333/cardsData",
    method: "GET"
  });

  // load the cads list from useAxios hook
  useEffect(() => {
    if (typeof cardsData === "undefined") {
      setValidCards([]);
      return () => {};
    }

    if (cardsData && cardsData.length > 0) {
      const valid = cardsData.filter(c => !checkCardExpired(c.exp!));
      setValidCards(valid);
      setTotalCards(cardsData.length);
    }
  }, [cardsData]);

  // check if I need to update the cards list
  useEffect(() => {
    if (location.state?.reload) {
      getCardsRequest();
    }
  }, [location, getCardsRequest]);

  // Delete a single card
  const handleDeleteCard = useCallback(
    (id: number) => {
      deleteCard(id)
        .then(res => getCardsRequest())
        .catch(err => console.log(err));
    },
    [getCardsRequest]
  );

  const handleClickRedirect = useCallback(() => {
    navigate("/cards/add");
  }, [navigate]);

  return (
    <>
      <Navbar validCards={validCards.length} totalCards={totalCards} />
      <Toolbar />
      <Container fixed maxWidth="sm">
        {loading ? (
          <Box mt={2} display={"flex"} justifyContent={"center"}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {validCards.map(card => (
              <Box
                m={3}
                key={card.id}
                display={"flex"}
                justifyContent={"center"}
              >
                <CardDetail card={card} handleDeleteCard={handleDeleteCard} />
              </Box>
            ))}
          </List>
        )}
      </Container>

      {/* Render the route /cards/add */}
      <Outlet context={{ getCardsRequest }} />

      <Button
        size="large"
        variant="contained"
        color="primary"
        sx={AddButtonStyle}
        endIcon={<Add />}
        onClick={handleClickRedirect}
      >
        Add new card
      </Button>
    </>
  );
};
export default Cards;
