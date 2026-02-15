import { describe, it, expect, vi } from "vitest";
import { cn, parseStringify, formatDateTime, encryptKey, decryptKey } from "@/lib/utils";

// ──────────────────────────────────────────────
// cn (class name merger)
// ──────────────────────────────────────────────
describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("should resolve Tailwind conflicts (last wins)", () => {
    const result = cn("px-4", "px-6");
    expect(result).toBe("px-6");
  });

  it("should handle empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("should handle undefined and null", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });

  it("should handle array inputs", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});

// ──────────────────────────────────────────────
// parseStringify
// ──────────────────────────────────────────────
describe("parseStringify", () => {
  it("should create a deep copy of an object", () => {
    const original = { a: 1, b: { c: 2 } };
    const result = parseStringify(original);
    expect(result).toEqual(original);
    expect(result).not.toBe(original);
    expect(result.b).not.toBe(original.b);
  });

  it("should handle arrays", () => {
    const original = [1, 2, { a: 3 }];
    const result = parseStringify(original);
    expect(result).toEqual(original);
    expect(result).not.toBe(original);
  });

  it("should strip non-serializable properties (functions)", () => {
    const original = { a: 1, fn: () => {} };
    const result = parseStringify(original);
    expect(result).toEqual({ a: 1 });
    expect(result.fn).toBeUndefined();
  });

  it("should convert Date to string", () => {
    const date = new Date("2026-01-15");
    const result = parseStringify({ date });
    expect(typeof result.date).toBe("string");
  });

  it("should handle null", () => {
    expect(parseStringify(null)).toBeNull();
  });

  it("should handle primitive values", () => {
    expect(parseStringify(42)).toBe(42);
    expect(parseStringify("hello")).toBe("hello");
    expect(parseStringify(true)).toBe(true);
  });
});

// ──────────────────────────────────────────────
// formatDateTime
// ──────────────────────────────────────────────
describe("formatDateTime", () => {
  // Use a fixed date to avoid timezone issues
  const testDate = new Date("2026-03-15T14:30:00Z");

  it("should return an object with dateTime, dateDay, dateOnly, timeOnly", () => {
    const result = formatDateTime(testDate);
    expect(result).toHaveProperty("dateTime");
    expect(result).toHaveProperty("dateDay");
    expect(result).toHaveProperty("dateOnly");
    expect(result).toHaveProperty("timeOnly");
  });

  it("should return string values for all properties", () => {
    const result = formatDateTime(testDate);
    expect(typeof result.dateTime).toBe("string");
    expect(typeof result.dateDay).toBe("string");
    expect(typeof result.dateOnly).toBe("string");
    expect(typeof result.timeOnly).toBe("string");
  });

  it("should handle string date input", () => {
    const result = formatDateTime("2026-03-15T14:30:00Z");
    expect(result.dateTime).toBeTruthy();
  });

  it("should format dateOnly without time", () => {
    const result = formatDateTime(testDate);
    // dateOnly should contain month and year but not time details
    expect(result.dateOnly).toMatch(/\d{4}/); // contains year
  });

  it("should format timeOnly without date", () => {
    const result = formatDateTime(testDate);
    // timeOnly should contain AM or PM (12-hour format)
    expect(result.timeOnly).toMatch(/AM|PM/);
  });

  it("should include AM/PM in dateTime", () => {
    const result = formatDateTime(testDate);
    expect(result.dateTime).toMatch(/AM|PM/);
  });
});

// ──────────────────────────────────────────────
// encryptKey / decryptKey
// ──────────────────────────────────────────────
describe("encryptKey / decryptKey", () => {
  it("should encode a passkey to base64", () => {
    const passkey = "123456";
    const encrypted = encryptKey(passkey);
    expect(encrypted).toBe(btoa("123456"));
    expect(encrypted).not.toBe(passkey);
  });

  it("should decode a base64 string back to original", () => {
    const passkey = "123456";
    const encrypted = encryptKey(passkey);
    const decrypted = decryptKey(encrypted);
    expect(decrypted).toBe(passkey);
  });

  it("should be reversible for any ASCII string", () => {
    const values = ["admin", "password123", "!@#$%^", "test-key-42"];
    for (const val of values) {
      expect(decryptKey(encryptKey(val))).toBe(val);
    }
  });

  it("should handle empty string", () => {
    expect(decryptKey(encryptKey(""))).toBe("");
  });
});
