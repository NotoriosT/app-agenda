import React from "react";
import { Button } from "react-native-elements";
import { colors } from "../theme/colors";

export default function PrimaryButton({ title, ...props }) {
    return (
        <Button
            title={title}
            buttonStyle={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                height: 48,
            }}
            titleStyle={{ fontWeight: "600" }}
            {...props}
        />
    );
}
