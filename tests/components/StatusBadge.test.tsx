import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock next/image since it's not available in test env
vi.mock("next/image", () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

import StatusBadge from "@/components/StatusBadge";

describe("StatusBadge", () => {
  it("should render scheduled status", () => {
    render(<StatusBadge status="scheduled" />);
    expect(screen.getByText("scheduled")).toBeInTheDocument();
  });

  it("should render pending status", () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("should render cancelled status", () => {
    render(<StatusBadge status="cancelled" />);
    expect(screen.getByText("cancelled")).toBeInTheDocument();
  });

  it("should apply green background for scheduled", () => {
    const { container } = render(<StatusBadge status="scheduled" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-green-600");
  });

  it("should apply blue background for pending", () => {
    const { container } = render(<StatusBadge status="pending" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-blue-600");
  });

  it("should apply red background for cancelled", () => {
    const { container } = render(<StatusBadge status="cancelled" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-red-600");
  });

  it("should render status icon image", () => {
    render(<StatusBadge status="scheduled" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/assets/icons/check.svg");
  });
});
