import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Stack,
  Box,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
import { useSWRConfig } from "swr";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function AccValidationBlock({ handleOpen, user }) {
  //   const { mutate } = useSWRConfig();
  // mutate(url);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        border: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
        height: "100%",
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Verification
      </Typography>
      <Stack direction="column" justifyContent="space-between">
        {user.isVerified ? (
          <>
            <Alert severity="success">
              <AlertTitle>Verified</AlertTitle>
              Now you have access to all features of the platform.
            </Alert>
          </>
        ) : (
          <Alert severity="error">
            <AlertTitle>Not Verified</AlertTitle>
            Only verified users have access to platform specific features.
          </Alert>
        )}
        <Typography variant="body1" sx={{ my: 3 }}>
          <strong>Note:</strong>This verfication is used to confirm the validity
          of the user&apos;s name, nationality and citizenship.
        </Typography>
        <Button
          variant="contained"
          disabled={user.isVerified}
          onClick={() => handleOpen()}
        >
          Verify Now
        </Button>
      </Stack>
    </Box>
  );
}

export default AccValidationBlock;
