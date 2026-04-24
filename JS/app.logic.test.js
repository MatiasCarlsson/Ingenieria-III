const {
  normalizeSearchQuery,
  shouldRunSearch,
  toggleSmallFavoriteIcon,
  toggleLargeFavoriteIcon,
} = require("./index");
const { getNextPasswordFieldType, validateLoginFields } = require("./login");

describe("Home behavior", () => {
  test("normalizeSearchQuery trims spaces", () => {
    expect(normalizeSearchQuery("  tomate  ")).toBe("tomate");
  });

  test("shouldRunSearch returns false for empty query", () => {
    expect(shouldRunSearch("   ")).toBe(false);
  });

  test("shouldRunSearch returns true for valid query", () => {
    expect(shouldRunSearch("lechuga")).toBe(true);
  });

  test("toggleSmallFavoriteIcon switches heart state", () => {
    expect(toggleSmallFavoriteIcon("♡")).toBe("♥");
    expect(toggleSmallFavoriteIcon("♥")).toBe("♡");
  });

  test("toggleLargeFavoriteIcon switches heart state", () => {
    expect(toggleLargeFavoriteIcon("❤️")).toBe("❤");
    expect(toggleLargeFavoriteIcon("❤")).toBe("❤️");
  });
});

describe("Login behavior", () => {
  test("getNextPasswordFieldType toggles type", () => {
    expect(getNextPasswordFieldType("password")).toBe("text");
    expect(getNextPasswordFieldType("text")).toBe("password");
  });

  test("validateLoginFields marks empty values as invalid", () => {
    const result = validateLoginFields("", "");
    expect(result.isValid).toBe(false);
    expect(result.errors.usuario).toBe("El usuario es requerido");
    expect(result.errors.password).toBe("La contrasena es requerida");
  });

  test("validateLoginFields passes when user and password are valid", () => {
    const result = validateLoginFields("admin", "1234");
    expect(result.isValid).toBe(true);
    expect(result.errors.usuario).toBe("");
    expect(result.errors.password).toBe("");
  });
});
