import HackColor from "./color/HackColor";

/**
 * Predefined colors to be used application-wide.
 * Colors are defined with a light-mode and an optional dark-mode variant.
 * Colors should be named using light-mode convention, that is, colors should be named according to how they should be read in light mode. "Dark text" is text that is dark in light mode, and light in dark mode.
 */
class HackColors {
    static get accent(): HackColor {
        return new HackColor("#1769ff");
    }

    static get textLightPersistent(): HackColor {
        return new HackColor("#f8f9fa");
    }

    static get background(): HackColor {
        return new HackColor("#ffffff", "#17171c");
    }

    static get textDark(): HackColor {
        return new HackColor("#3f4169", "#e5e5f3");
    }

    static get textSemiDark(): HackColor {
        return new HackColor("#a6a8c5", "#818182");
    }

    static get textLight(): HackColor {
        return new HackColor("#f8f9fa", "#000000");
    }

    static get fillBackgroundLight(): HackColor {
        return new HackColor("#f2f3f9", "#27272f");
    }

    static get fillBackgroundDark(): HackColor {
        return new HackColor("#3f4169", "#e0e1e7");
    }

    static get chipBackground(): HackColor {
        return new HackColor("#3f4169", "#454552");
    }

    static get behance(): HackColor {
        return new HackColor("#1769ff");
    }

    static get gitHub(): HackColor {
        return new HackColor("#24292f", "#3f4169");
    }

    static get linkedIn(): HackColor {
        return new HackColor("#2d64bc");
    }
}

export default HackColors;
