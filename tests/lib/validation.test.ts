import { describe, it, expect } from "vitest";
import {
  UserFormValidation,
  PatientFormValidation,
  CreateAppointmentSchema,
  ScheduleAppointmentSchema,
  CancelAppointmentSchema,
  getAppointmentSchema,
} from "@/lib/validation";

// ──────────────────────────────────────────────
// UserFormValidation
// ──────────────────────────────────────────────
describe("UserFormValidation", () => {
  it("should accept valid user data", () => {
    const result = UserFormValidation.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    });
    expect(result.success).toBe(true);
  });

  it("should reject a name shorter than 2 characters", () => {
    const result = UserFormValidation.safeParse({
      name: "J",
      email: "john@example.com",
      phone: "+1234567890",
    });
    expect(result.success).toBe(false);
  });

  it("should reject a name longer than 50 characters", () => {
    const result = UserFormValidation.safeParse({
      name: "A".repeat(51),
      email: "john@example.com",
      phone: "+1234567890",
    });
    expect(result.success).toBe(false);
  });

  it("should reject an invalid email", () => {
    const result = UserFormValidation.safeParse({
      name: "John",
      email: "not-an-email",
      phone: "+1234567890",
    });
    expect(result.success).toBe(false);
  });

  it("should reject an empty email", () => {
    const result = UserFormValidation.safeParse({
      name: "John",
      email: "",
      phone: "+1234567890",
    });
    expect(result.success).toBe(false);
  });

  it("should reject a phone number without + prefix", () => {
    const result = UserFormValidation.safeParse({
      name: "John",
      email: "john@example.com",
      phone: "1234567890",
    });
    expect(result.success).toBe(false);
  });

  it("should reject a phone number that is too short", () => {
    const result = UserFormValidation.safeParse({
      name: "John",
      email: "john@example.com",
      phone: "+12345",
    });
    expect(result.success).toBe(false);
  });

  it("should reject a phone number that is too long", () => {
    const result = UserFormValidation.safeParse({
      name: "John",
      email: "john@example.com",
      phone: "+1234567890123456",
    });
    expect(result.success).toBe(false);
  });

  it("should reject missing fields", () => {
    const result = UserFormValidation.safeParse({});
    expect(result.success).toBe(false);
  });
});

// ──────────────────────────────────────────────
// PatientFormValidation
// ──────────────────────────────────────────────
describe("PatientFormValidation", () => {
  const validPatient = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1234567890",
    birthDate: new Date("1990-05-15"),
    gender: "Female" as const,
    address: "123 Main Street, City",
    occupation: "Software Engineer",
    emergencyContactName: "John Doe",
    emergencyContactNumber: "+0987654321",
    primaryPhysician: "Dr. Smith",
    insuranceProvider: "BlueCross",
    insurancePolicyNumber: "POL-123456",
    treatmentConsent: true,
    disclosureConsent: true,
    privacyConsent: true,
  };

  it("should accept valid patient data", () => {
    const result = PatientFormValidation.safeParse(validPatient);
    expect(result.success).toBe(true);
  });

  it("should accept patient data with optional fields", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      allergies: "Peanuts",
      currentMedication: "None",
      familyMedicalHistory: "Diabetes",
      pastMedicalHistory: "Appendectomy",
      identificationType: "Passport",
      identificationNumber: "AB1234567",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid gender value", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      gender: "Unknown",
    });
    expect(result.success).toBe(false);
  });

  it("should reject if treatmentConsent is false", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      treatmentConsent: false,
    });
    expect(result.success).toBe(false);
  });

  it("should reject if disclosureConsent is false", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      disclosureConsent: false,
    });
    expect(result.success).toBe(false);
  });

  it("should reject if privacyConsent is false", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      privacyConsent: false,
    });
    expect(result.success).toBe(false);
  });

  it("should reject address shorter than 5 characters", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      address: "123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid emergency contact number", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      emergencyContactNumber: "not-a-phone",
    });
    expect(result.success).toBe(false);
  });

  it("should reject occupation shorter than 2 characters", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      occupation: "A",
    });
    expect(result.success).toBe(false);
  });

  it("should reject if primaryPhysician is too short", () => {
    const result = PatientFormValidation.safeParse({
      ...validPatient,
      primaryPhysician: "A",
    });
    expect(result.success).toBe(false);
  });
});

// ──────────────────────────────────────────────
// Appointment Schemas
// ──────────────────────────────────────────────
describe("CreateAppointmentSchema", () => {
  const validAppointment = {
    primaryPhysician: "Dr. Smith",
    schedule: new Date("2026-03-15T10:00:00"),
    reason: "Regular checkup",
  };

  it("should accept valid appointment data", () => {
    const result = CreateAppointmentSchema.safeParse(validAppointment);
    expect(result.success).toBe(true);
  });

  it("should accept appointment with optional note", () => {
    const result = CreateAppointmentSchema.safeParse({
      ...validAppointment,
      note: "First visit",
    });
    expect(result.success).toBe(true);
  });

  it("should reject missing reason", () => {
    const { reason, ...withoutReason } = validAppointment;
    const result = CreateAppointmentSchema.safeParse(withoutReason);
    expect(result.success).toBe(false);
  });

  it("should reject reason shorter than 2 characters", () => {
    const result = CreateAppointmentSchema.safeParse({
      ...validAppointment,
      reason: "A",
    });
    expect(result.success).toBe(false);
  });

  it("should reject missing schedule", () => {
    const { schedule, ...withoutSchedule } = validAppointment;
    const result = CreateAppointmentSchema.safeParse(withoutSchedule);
    expect(result.success).toBe(false);
  });

  it("should reject missing primaryPhysician", () => {
    const { primaryPhysician, ...withoutDoctor } = validAppointment;
    const result = CreateAppointmentSchema.safeParse(withoutDoctor);
    expect(result.success).toBe(false);
  });
});

describe("ScheduleAppointmentSchema", () => {
  it("should accept data without reason (optional for scheduling)", () => {
    const result = ScheduleAppointmentSchema.safeParse({
      primaryPhysician: "Dr. Smith",
      schedule: new Date("2026-03-15T10:00:00"),
    });
    expect(result.success).toBe(true);
  });

  it("should require primaryPhysician", () => {
    const result = ScheduleAppointmentSchema.safeParse({
      schedule: new Date("2026-03-15T10:00:00"),
    });
    expect(result.success).toBe(false);
  });
});

describe("CancelAppointmentSchema", () => {
  it("should require cancellationReason with min 2 chars", () => {
    const result = CancelAppointmentSchema.safeParse({
      primaryPhysician: "Dr. Smith",
      schedule: new Date("2026-03-15T10:00:00"),
      cancellationReason: "A",
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid cancellation data", () => {
    const result = CancelAppointmentSchema.safeParse({
      primaryPhysician: "Dr. Smith",
      schedule: new Date("2026-03-15T10:00:00"),
      cancellationReason: "Patient requested cancellation",
    });
    expect(result.success).toBe(true);
  });
});

// ──────────────────────────────────────────────
// getAppointmentSchema
// ──────────────────────────────────────────────
describe("getAppointmentSchema", () => {
  it('should return CreateAppointmentSchema for "create"', () => {
    expect(getAppointmentSchema("create")).toBe(CreateAppointmentSchema);
  });

  it('should return CancelAppointmentSchema for "cancel"', () => {
    expect(getAppointmentSchema("cancel")).toBe(CancelAppointmentSchema);
  });

  it('should return ScheduleAppointmentSchema for "schedule"', () => {
    expect(getAppointmentSchema("schedule")).toBe(ScheduleAppointmentSchema);
  });

  it("should return ScheduleAppointmentSchema for unknown type", () => {
    expect(getAppointmentSchema("unknown")).toBe(ScheduleAppointmentSchema);
  });
});
