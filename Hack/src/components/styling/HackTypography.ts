import HackColors from "./HackColors";
import { HackFontFamily } from "./typography/HackFontFamily";
import { HackFontWeight } from "./typography/HackFontWeight";
import HackTypographyConfig from "./typography/HackTypographyConfig";

/**
 * Predefined typography to be used application-wide.
 */
class HackTypography {
    static get timerSubscript(): HackTypographyConfig {
        return new HackTypographyConfig(28, HackFontFamily.fredoka, HackColors.textDark, HackFontWeight.bold);
    }

    static get timer(): HackTypographyConfig {
        return new HackTypographyConfig(80, HackFontFamily.fredoka, HackColors.textDark, HackFontWeight.bold);
    }

    static get body(): HackTypographyConfig {
        return new HackTypographyConfig(16, HackFontFamily.fredoka, HackColors.textDark);
    }

    static get subscript(): HackTypographyConfig {
        return new HackTypographyConfig(14, HackFontFamily.fredoka, HackColors.textSemiDark, HackFontWeight.regular);
    }

    static get chip(): HackTypographyConfig {
        return new HackTypographyConfig(
            11.5,
            HackFontFamily.fredoka,
            HackColors.textLightPersistent,
            HackFontWeight.regular,
        );
    }

    static get button(): HackTypographyConfig {
        return new HackTypographyConfig(18, HackFontFamily.fredoka, HackColors.textLight);
    }

    static get buttonCompact(): HackTypographyConfig {
        return new HackTypographyConfig(14, HackFontFamily.fredoka, HackColors.textLight, HackFontWeight.regular);
    }
}

export default HackTypography;
