import { ResFontFamily } from "./ResFontFamily";
import { ResFontWeight } from "./ResFontWeight";
import ResColor from "../color/ResColor";

class ResTypographyConfig {
    public size: number;
    public fontFamily: ResFontFamily;
    // An undefined color allows the component handle the color
    public resColor: ResColor | undefined;
    public weight: ResFontWeight;
    public italic: boolean;
    public underlined: boolean;
    public linedOut: boolean;
    public kerning: number;
    get color(): string | undefined {
        return this.resColor?.getColor();
    }
    get lineStyle(): "none" | "underline" | "line-through" | "underline line-through" {
        let result = "";
        if (!this.underlined && !this.linedOut) {
            result = "none";
        } else {
            if (this.underlined) {
                result = "underline";
            }
            if (this.linedOut) {
                result = (result + " line-through").trimStart();
            }
        }
        return result as "none" | "underline" | "line-through" | "underline line-through";
    }

    constructor(
        size: number,
        fontFamily: ResFontFamily,
        color: ResColor | undefined,
        weight: ResFontWeight = ResFontWeight.medium,
        italic: boolean = false,
        underlined: boolean = false,
        linedOut: boolean = false,
        kerning: number = 0,
    ) {
        this.size = size;
        this.fontFamily = fontFamily;
        this.resColor = color;
        this.weight = weight;
        this.italic = italic;
        this.underlined = underlined;
        this.linedOut = linedOut;
        this.kerning = kerning;
    }

    public withSize(size: number): ResTypographyConfig {
        this.size = size;
        return this;
    }

    public withColor(color: ResColor): ResTypographyConfig {
        this.resColor = color;
        return this;
    }

    public withWeight(weight: ResFontWeight): ResTypographyConfig {
        this.weight = weight;
        return this;
    }

    public withItalic(italic: boolean): ResTypographyConfig {
        this.italic = italic;
        return this;
    }

    public withUnderline(underline: boolean): ResTypographyConfig {
        this.underlined = underline;
        return this;
    }

    public withLineOut(lineOut: boolean): ResTypographyConfig {
        this.linedOut = lineOut;
        return this;
    }

    public getStylesheet(): React.CSSProperties {
        return {
            fontFamily: this.fontFamily,
            fontWeight: this.weight,
            color: this.color || "inherit",
            fontSize: this.size,
            textDecorationLine: this.lineStyle,
            letterSpacing: this.kerning,
            fontStyle: this.italic ? "italic" : "normal",
        };
    }
}

export default ResTypographyConfig;
