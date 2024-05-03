import ResColor from "./color/ResColor";

/**
 * Predefined colors to be used application-wide.
 * Colors are defined with a light-mode and an optional dark-mode variant.
 * Colors should be named using light-mode convention, that is, colors should be named according to how they should be read in light mode. "Dark text" is text that is dark in light mode, and light in dark mode.
 */
class ResColors {
    static get accent(): ResColor {
        return new ResColor("#1769ff");
    }

    static get textLightPersistent(): ResColor {
        return new ResColor("#f8f9fa");
    }

    static get background(): ResColor {
        return new ResColor("#ffffff", "#17171c");
    }

    static get textDark(): ResColor {
        return new ResColor("#3f4169", "#e5e5f3");
    }

    static get textSemiDark(): ResColor {
        return new ResColor("#a6a8c5", "#818182");
    }

    static get textLight(): ResColor {
        return new ResColor("#f8f9fa", "#000000");
    }

    static get fillBackgroundLight(): ResColor {
        return new ResColor("#f2f3f9", "#27272f");
    }

    static get fillBackgroundDark(): ResColor {
        return new ResColor("#3f4169", "#e0e1e7");
    }

    static get chipBackground(): ResColor {
        return new ResColor("#3f4169", "#454552");
    }

    static get behance(): ResColor {
        return new ResColor("#1769ff");
    }

    static get gitHub(): ResColor {
        return new ResColor("#24292f", "#3f4169");
    }

    static get linkedIn(): ResColor {
        return new ResColor("#2d64bc");
    }
}

export default ResColors;
