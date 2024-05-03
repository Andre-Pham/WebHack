import { useState } from "react";
import ResDimensions from "../styling/ResDimensions";
import VStack from "../containers/Stacks/VStack";
import ResButton from "../base/ResButton";
import ResText from "../base/ResText";
import ResTypography from "../styling/ResTypography";
import ResColors from "../styling/ResColors";

function AppScreen() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ padding: ResDimensions.screenPadding }}>
            <VStack>
                <ResText typography={ResTypography.header}>{`Hello World ${count}`}</ResText>

                <ResButton
                    label="Press Me"
                    typography={ResTypography.button}
                    color={ResColors.accent}
                    onPress={() => {
                        setCount(count + 1);
                    }}
                />
            </VStack>
        </div>
    );
}

export default AppScreen;
