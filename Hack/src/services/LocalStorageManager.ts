import { ColorScheme } from "./../state/publishers/types/ColorScheme";

class LocalStorageManager {
    public static readonly inst = new LocalStorageManager();

    private static readonly DARKMODE_KEY = "darkmode";

    private constructor() {}

    public writeColorTheme(theme: ColorScheme) {
        localStorage.setItem(LocalStorageManager.DARKMODE_KEY, theme == ColorScheme.dark ? "true" : "false");
    }

    public readColorTheme(): ColorScheme {
        const read = localStorage.getItem(LocalStorageManager.DARKMODE_KEY);
        if (read === null) {
            // Default to light
            return ColorScheme.light;
        }
        return read === "true" ? ColorScheme.dark : ColorScheme.light;
    }
}

export default LocalStorageManager;
