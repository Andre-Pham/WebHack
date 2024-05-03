import { useState } from "react";
import HackDimensions from "../styling/HackDimensions";
import VStack from "../containers/Stacks/VStack";
import HackButton from "../base/HackButton";
import HackText from "../base/HackText";
import HackTypography from "../styling/HackTypography";
import HackColors from "../styling/HackColors";

function AppScreen() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ padding: HackDimensions.screenPadding }}>
            <VStack>
                <HackText typography={HackTypography.header}>{`Hello World ${count}`}</HackText>

                <HackButton
                    label="Press Me"
                    typography={HackTypography.button}
                    color={HackColors.accent}
                    onPress={() => {
                        setCount(count + 1);
                    }}
                />
            </VStack>
        </div>
    );
}

export default AppScreen;
