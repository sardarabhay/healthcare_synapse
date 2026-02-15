import { describe, it, expect } from "vitest";
import {
  GenderOptions,
  PatientFormDefaultValues,
  IdentificationTypes,
  Doctors,
  StatusIcon,
} from "@/constants";

describe("GenderOptions", () => {
  it("should contain exactly 3 options", () => {
    expect(GenderOptions).toHaveLength(3);
  });

  it('should contain Male, Female, Other', () => {
    expect(GenderOptions).toEqual(["Male", "Female", "Other"]);
  });
});

describe("PatientFormDefaultValues", () => {
  it("should have name field (not firstName/lastName)", () => {
    expect(PatientFormDefaultValues).toHaveProperty("name");
    expect(PatientFormDefaultValues).not.toHaveProperty("firstName");
    expect(PatientFormDefaultValues).not.toHaveProperty("lastName");
  });

  it("should have all required fields with empty defaults", () => {
    expect(PatientFormDefaultValues.name).toBe("");
    expect(PatientFormDefaultValues.email).toBe("");
    expect(PatientFormDefaultValues.phone).toBe("");
    expect(PatientFormDefaultValues.address).toBe("");
    expect(PatientFormDefaultValues.occupation).toBe("");
  });

  it("should have consent fields defaulting to false", () => {
    expect(PatientFormDefaultValues.treatmentConsent).toBe(false);
    expect(PatientFormDefaultValues.disclosureConsent).toBe(false);
    expect(PatientFormDefaultValues.privacyConsent).toBe(false);
  });

  it("should have birthDate as a Date object", () => {
    expect(PatientFormDefaultValues.birthDate).toBeInstanceOf(Date);
  });

  it("should have identificationDocument as empty array", () => {
    expect(PatientFormDefaultValues.identificationDocument).toEqual([]);
  });
});

describe("IdentificationTypes", () => {
  it("should be a non-empty array of strings", () => {
    expect(IdentificationTypes.length).toBeGreaterThan(0);
    IdentificationTypes.forEach((type) => {
      expect(typeof type).toBe("string");
    });
  });

  it("should include common identification types", () => {
    expect(IdentificationTypes).toContain("Passport");
    expect(IdentificationTypes).toContain("Driver's License");
    expect(IdentificationTypes).toContain("Birth Certificate");
  });
});

describe("Doctors", () => {
  it("should be a non-empty array", () => {
    expect(Doctors.length).toBeGreaterThan(0);
  });

  it("should have name and image for each doctor", () => {
    Doctors.forEach((doctor) => {
      expect(doctor).toHaveProperty("name");
      expect(doctor).toHaveProperty("image");
      expect(typeof doctor.name).toBe("string");
      expect(doctor.image).toMatch(/^\/assets\/images\//);
    });
  });

  it("should have unique doctor names", () => {
    const names = Doctors.map((d) => d.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});

describe("StatusIcon", () => {
  it("should have icons for all three statuses", () => {
    expect(StatusIcon).toHaveProperty("scheduled");
    expect(StatusIcon).toHaveProperty("pending");
    expect(StatusIcon).toHaveProperty("cancelled");
  });

  it("should point to SVG files", () => {
    expect(StatusIcon.scheduled).toMatch(/\.svg$/);
    expect(StatusIcon.pending).toMatch(/\.svg$/);
    expect(StatusIcon.cancelled).toMatch(/\.svg$/);
  });
});
