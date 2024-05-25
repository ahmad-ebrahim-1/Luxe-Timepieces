import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const Service = ({ service }) => {
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 325, minHeight: 325, boxShadow: 6 }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Stack spacing={1} display="flex" alignItems="center">
          <Box component="div" sx={{ color: "primary.main" }}>
            {service.icon}
          </Box>

          <Typography variant="h6" textAlign="center" color="primary.main">
            {service.title}
          </Typography>
        </Stack>

        <Typography variant="body2">{service.caption}</Typography>
      </CardContent>
    </Card>
  );
};

export default Service;
