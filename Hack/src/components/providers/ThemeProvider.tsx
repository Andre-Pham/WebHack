import React, { createContext, useState, useEffect, useMemo } from "react";
import StateManager from "../../state/publishers/StateManager";
import ResColors from "../styling/ResColors";
import LocalStorageManager from "../../services/LocalStorageManager";

const ColorThemeContext = createContext(StateManager.colorScheme.read());

interface Props {
    children: React.ReactNode;
}

export const ColorThemeProvider: React.FC<Props> = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(StateManager.colorScheme.read());
    const value = useMemo(() => ({ colorScheme, setColorScheme }), [colorScheme]);

    useEffect(() => {
        const unsubscribe = StateManager.colorScheme.subscribe(() => {
            setColorScheme(StateManager.colorScheme.read());
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = ResColors.background.getColor();
        LocalStorageManager.inst.writeColorTheme(colorScheme);
    }, [colorScheme]);

    return <ColorThemeContext.Provider value={value.colorScheme}>{children}</ColorThemeContext.Provider>;
};
