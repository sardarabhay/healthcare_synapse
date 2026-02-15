import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: any) => {
    return <img {...props} />;
  },
}));

import StatCard from "@/components/StatCard";

describe("StatCard", () => {
  const defaultProps = {
    type: "appointments" as const,
    count: 42,
    label: "Total Appointments",
    icon: "/assets/icons/appointments.svg",
  };

  it("should render count", () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("should render label", () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText("Total Appointments")).toBeInTheDocument();
  });

  it("should render icon", () => {
    render(<StatCard {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/assets/icons/appointments.svg");
  });

  it("should default count to 0", () => {
    render(
      <StatCard
        type="appointments"
        count={0}
        label="Total"
        icon="/icon.svg"
      />
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should apply appointments background class", () => {
    const { container } = render(<StatCard {...defaultProps} />);
    expect(container.firstChild).toHaveClass("bg-appointments");
  });

  it("should apply pending background class", () => {
    const { container } = render(
      <StatCard {...defaultProps} type="pending" />
    );
    expect(container.firstChild).toHaveClass("bg-pending");
  });

  it("should apply cancelled background class", () => {
    const { container } = render(
      <StatCard {...defaultProps} type="cancelled" />
    );
    expect(container.firstChild).toHaveClass("bg-cancelled");
  });
});
