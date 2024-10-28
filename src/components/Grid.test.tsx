import { render } from "@testing-library/react";
import Grid from "./Grid";

describe("Grid Component", () => {
  test("renders with default props", () => {
    const { container } = render(
      <Grid columns={{ base: 2 }}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );
    expect(container.firstChild).toHaveClass("grid gap-4 grid-cols-2");
    expect(container.firstChild).toHaveStyle({
      alignItems: "stretch",
      justifyItems: "stretch",
    });
  });

  test("renders with custom column sizes", () => {
    const { container } = render(
      <Grid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );
    expect(container.firstChild).toHaveClass(
      "grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    );
  });

  test("renders with custom gap and rowGap", () => {
    const { container } = render(
      <Grid columns={{ base: 2 }} gap={8} rowGap={10}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );
    expect(container.firstChild).toHaveClass(
      "grid gap-8 row-gap-10 grid-cols-2"
    );
  });

  test("renders with custom alignItems and justifyItems", () => {
    const { container } = render(
      <Grid columns={{ base: 2 }} alignItems="center" justifyItems="end">
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );
    expect(container.firstChild).toHaveStyle({
      alignItems: "center",
      justifyItems: "end",
    });
  });

  test("renders children correctly", () => {
    const { getByText } = render(
      <Grid columns={{ base: 2 }}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );
    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
  });
});
