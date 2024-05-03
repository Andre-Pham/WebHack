/**
 * Predefined CSS to be used application-wide.
 */
class ResCSS {
    static get diableSelection(): React.CSSProperties {
        return {
            // Non-prefixed version, currently supported by Chrome, Opera and Edge
            userSelect: "none",
            // Safari
            WebkitUserSelect: "none",
            // Firefox
            MozUserSelect: "none",
            // Internet Explorer/Edge
            msUserSelect: "none",
        };
    }

    static get shadow(): React.CSSProperties {
        return {
            boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.4)",
        };
    }
}

export default ResCSS;
