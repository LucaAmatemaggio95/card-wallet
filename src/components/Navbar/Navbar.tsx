import {
  Alert,
  AppBar,
  Box,
  Divider,
  Toolbar,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  validCards: number;
  totalCards: number;
};

const ToolbarStyle = { display: "flex", justifyContent: "flex-start" };

const Navbar = ({ validCards, totalCards }: Props) => {
  const theme = useTheme();
  const invalidCount = totalCards - validCards;

  return (
    <AppBar color="transparent" elevation={0} position="fixed">
      <Toolbar sx={ToolbarStyle}>
        <Typography variant="h6">My Cards</Typography>
        <Divider
          flexItem
          orientation={"vertical"}
          sx={{ ml: theme.spacing(8), mr: theme.spacing(2) }}
        />

        <Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Alert severity="info">{`${totalCards} total`}</Alert>
            <Box mx={2}>
              <Alert>{`${validCards} valid`}</Alert>
            </Box>
            <Alert severity="warning">{`${invalidCount} invalid`}</Alert>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
