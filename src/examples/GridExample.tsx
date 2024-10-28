import React, { useState } from "react";
import Grid from "../components/Grid";

const GridExample: React.FC = () => {
  return (
    <Grid
      columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
      gap={6}
      rowGap={8}
      alignItems="center"
      justifyItems="center"
    >
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      <div>Item 6</div>
    </Grid>
  );
};

export default GridExample;
