import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: any) => {
    return <img {...props} />;
  },
}));

import SubmitButton from "@/components/SubmitButton";

describe("SubmitButton", () => {
  it("should render children when not loading", () => {
    render(
      <SubmitButton isLoading={false}>
        Submit
      </SubmitButton>
    );
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should show loader when isLoading is true", () => {
    render(
      <SubmitButton isLoading={true}>
        Submit
      </SubmitButton>
    );
    // Children text should not be visible
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();
    // Loader image should be visible
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/assets/icons/loader.svg");
    expect(img).toHaveAttribute("alt", "loader");
  });

  it("should be disabled when loading", () => {
    render(
      <SubmitButton isLoading={true}>
        Submit
      </SubmitButton>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should not be disabled when not loading", () => {
    render(
      <SubmitButton isLoading={false}>
        Submit
      </SubmitButton>
    );
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should have type submit", () => {
    render(
      <SubmitButton isLoading={false}>
        Submit
      </SubmitButton>
    );
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("should use default className when none provided", () => {
    render(
      <SubmitButton isLoading={false}>
        Submit
      </SubmitButton>
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("shad-primary-btn");
  });

  it("should use custom className when provided", () => {
    render(
      <SubmitButton isLoading={false} className="custom-class">
        Submit
      </SubmitButton>
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });
});
