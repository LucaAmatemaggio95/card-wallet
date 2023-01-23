import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import luhnCheck from "../../utils/checkLuhnAlg";
import { CardPost } from "../../types";
import { format } from "date-fns";
import { postNewCard } from "../../utils/api";

const CardsAdd = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm();

  const onSubmit = ({ Card_Number, cvv, exp, circuit }: CardPost) => {
    const formattedExp = format(new Date(exp!).getTime(), "dd/MM/yyyy");

    const formattedForm: CardPost = {
      Card_Number,
      cvv,
      exp: formattedExp,
      circuit
    };

    postNewCard(formattedForm)
      .then(res => {
        navigate("/cards", { state: { reload: true } });
      })
      .catch(err => console.log(err));
  };

  const handleClickBack = () => {
    navigate("/cards");
  };

  return (
    <>
      <Dialog open fullWidth={true} maxWidth={"sm"}>
        <DialogTitle>Add new card</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    {...register("Card_Number", {
                      required: "Field required",
                      validate: { luhnCheck }
                    })}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        error={errors?.Card_Number as unknown as boolean}
                        onChange={onChange}
                        value={value}
                        label={"Card number"}
                        fullWidth
                      />
                    )}
                  />
                  {errors?.Card_Number && (
                    <FormHelperText error>
                      {errors?.Card_Number?.type === "luhnCheck" ? (
                        <>Card number not valid</>
                      ) : (
                        <>{errors?.cardnumber?.message as string}</>
                      )}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    {...register("cvv", {
                      required: "Field required",
                      valueAsNumber: true,
                      maxLength: {
                        value: 3,
                        message: "Can have maximum 3 digits"
                      }
                    })}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextField
                          error={errors?.cvv as unknown as boolean}
                          onChange={onChange}
                          value={value}
                          label={"CVV"}
                          type="number"
                          fullWidth
                        />
                      </>
                    )}
                  />
                  {errors?.cvv && (
                    <FormHelperText error>
                      {errors?.cvv?.message as string}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      {...register("exp", {
                        required: "Field required"
                      })}
                      defaultValue={""}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <DesktopDatePicker
                          inputFormat="dd/MM/yyyy"
                          onChange={onChange}
                          value={value}
                          label="Expiration date"
                          renderInput={params => (
                            <TextField
                              error={errors?.exp as unknown as boolean}
                              {...params}
                            />
                          )}
                        />
                      )}
                    />
                    {errors?.exp && (
                      <FormHelperText error>
                        {errors?.exp?.message as string}
                      </FormHelperText>
                    )}
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    {...register("circuit", {
                      required: "Field required"
                    })}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <FormControl fullWidth>
                        <InputLabel
                          error={errors?.circuit as unknown as boolean}
                          id="circuit-label"
                        >
                          Circuit
                        </InputLabel>
                        <Select
                          error={errors?.circuit as unknown as boolean}
                          labelId="circuit-label"
                          label="Circuit"
                          onChange={onChange}
                          value={value}
                          fullWidth
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem value="Visa">Visa</MenuItem>
                          <MenuItem value="Mastercard">Mastercard</MenuItem>
                        </Select>
                        {errors?.circuit && (
                          <FormHelperText error>
                            {errors?.circuit?.message as string}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClickBack}>
            back to list
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardsAdd;
