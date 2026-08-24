const colorMap = {
  green: "#64d583",
  blue: "#91a8f9",
  orange: "#ee955e",
  pink: "#ee92d7",
  purple: "#aa8ef0",
  yellow: "#f5d770",
  default: "#64d583",
};

/**
 * Converts a color name into its corresponding hex value.
 * Falls back to the default color if the name is not found.
 *
 * @param {string} colorName
 * @returns {string}
 */
function stringToHex(colorName) {
  const color = colorMap[colorName];
  return color || colorMap.default;
}

/**
 * Converts a hex color value into its corresponding color name.
 * Returns null if no matching color name exists.
 *
 * @param {string} hexValue
 * @returns {string|null}
 */
function hexToString(hexValue) {
  const colorString = Object.keys(colorMap).find((key) => {
    return colorMap[key] === hexValue;
  });

  return colorString || null;
}

/**
 * Removes all BEM "_color_" modifier classes from an element.
 *
 * @param {HTMLElement} element
 */
function removeColorClasses(element) {
  [...element.classList].forEach((cls) => {
    if (cls.includes("_color_")) {
      element.classList.remove(cls);
    }
  });
}

export { hexToString, removeColorClasses };
