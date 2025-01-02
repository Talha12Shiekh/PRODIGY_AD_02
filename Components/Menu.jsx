import { MenuView } from "@react-native-menu/menu";
import { forwardRef } from "react";
import { WHITE_COLOR } from "../Constants";



export const Menu = forwardRef(function Menu({children,handleSignOut}, ref) {
    return <MenuView
        ref={ref}
        title="Menu Title"
        onPressAction={handleSignOut}
        actions={[
            {
                id: 'logout',
                title: 'Logout',
                titleColor:WHITE_COLOR,
                image: Platform.select({
                    ios: 'logout',
                    android: 'ic_menu_today',
                }),
            },
        ]}
        shouldOpenOnLongPress={false}
    >
        {children}
    </MenuView>
});