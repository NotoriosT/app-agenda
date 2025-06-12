import { colors }     from "./colors";
import { typography } from "./typography";

export const theme = {
    colors,
    Text: {
        style: { ...typography.body, color: colors.text },
    },
    Button: {
        buttonStyle: {
            backgroundColor: colors.primary,
            borderRadius: 12,
            height: 48,
        },
        titleStyle: { fontFamily: typography.fontFamilyBold },
    },
    Input: {
        containerStyle: { paddingHorizontal: 0 },
        inputContainerStyle: {
            borderWidth: 1,
            borderRadius: 12,
            borderColor: colors.neutral300,
            paddingHorizontal: 12,
            height: 48,
        },
        inputStyle: { fontFamily: typography.fontFamilyRegular },
    },
};
