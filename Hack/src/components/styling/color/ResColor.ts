import { assert } from "../../../language/assertions/Assert";
import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import StateManager from "../../../state/publishers/StateManager";
import { ColorScheme } from "../../../state/publishers/types/ColorScheme";

class ResColor {
    // Hex string
    private readonly lightMode: string;
    // Hex string
    private readonly darkMode: string;

    constructor(lightMode: string, darkMode?: string) {
        const hexRegex = /^#[0-9a-fA-F]+$/;
        // If no dark mode is provided, dark mode / light mode is equivalent
        let setDarkMode = darkMode || lightMode;
        assert(hexRegex.test(lightMode), `Invalid lightMode hex color string provided: '${lightMode}'`);
        assert(hexRegex.test(setDarkMode), `Invalid darkMode hex color string provided: '${setDarkMode}'`);
        this.lightMode = lightMode;
        this.darkMode = setDarkMode;
    }

    /**
     * Gets the color based on the user's active color scheme (light mode / dark mode)
     *
     * @returns Validated color string
     */
    public getColor(): string {
        let colorScheme = StateManager.colorScheme.read();
        switch (colorScheme) {
            case ColorScheme.dark:
                return this.darkMode;
            case ColorScheme.light:
                return this.lightMode;
            default:
                throw new UnreachableCaseError(colorScheme);
        }
    }

    public getContrastColor(): string {
        let hex = this.getColor();
        hex = hex.slice(1); // Remove "#"
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        assert(hex.length === 6, "Invalid hex color found");
        let r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
}

export default ResColor;
