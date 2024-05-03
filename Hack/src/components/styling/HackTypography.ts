import HackColors from "./HackColors";
import { HackFontFamily } from "./typography/HackFontFamily";
import { HackFontWeight } from "./typography/HackFontWeight";
import HackTypographyConfig from "./typography/HackTypographyConfig";

/**
 * Predefined typography to be used application-wide.
 */
class HackTypography {
    static get pageTitle(): HackTypographyConfig {
        return new HackTypographyConfig(32, HackFontFamily.gilroy, HackColors.textDark, HackFontWeight.black);
    }

    static get splash(): HackTypographyConfig {
        return new HackTypographyConfig(34, HackFontFamily.circular, HackColors.textDark, HackFontWeight.bold);
    }

    static get standoutBody(): HackTypographyConfig {
        return new HackTypographyConfig(16, HackFontFamily.plexMono, HackColors.textDark);
    }

    static get body(): HackTypographyConfig {
        return new HackTypographyConfig(14, HackFontFamily.plexMono, HackColors.textDark);
    }

    static get subscript(): HackTypographyConfig {
        return new HackTypographyConfig(14, HackFontFamily.plexMono, HackColors.textSemiDark, HackFontWeight.regular);
    }

    static get subscriptLabel(): HackTypographyConfig {
        return new HackTypographyConfig(11.5, HackFontFamily.plexMono, HackColors.textSemiDark, HackFontWeight.regular);
    }

    static get chip(): HackTypographyConfig {
        return new HackTypographyConfig(
            11.5,
            HackFontFamily.plexMono,
            HackColors.textLightPersistent,
            HackFontWeight.regular,
        );
    }

    static get button(): HackTypographyConfig {
        return new HackTypographyConfig(15, HackFontFamily.plexMono, HackColors.textLight);
    }

    static get buttonCompact(): HackTypographyConfig {
        return new HackTypographyConfig(14, HackFontFamily.plexMono, HackColors.textLight, HackFontWeight.regular);
    }

    static get sectionTitle(): HackTypographyConfig {
        return new HackTypographyConfig(26, HackFontFamily.gilroy, HackColors.textDark, HackFontWeight.black);
    }

    static get header(): HackTypographyConfig {
        return new HackTypographyConfig(
            31,
            HackFontFamily.circular,
            HackColors.textDark,
            HackFontWeight.black,
            false,
            false,
            false,
            -0.5,
        );
    }
}

export default HackTypography;
