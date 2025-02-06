import { Contact, Expertise, Home, Project, Skils } from "../pages"
import { AppLayout } from "../layout/AppLayout"
import { ThemeContextProvider } from "../context/UserThemeContext"
import { AsideBar } from "../components"
import { FC } from "react"
import { UserDataContext } from "../context/UserDataContext"

export const AppRouter: FC = () => {

    return (
        <ThemeContextProvider>

            <UserDataContext>

                <AppLayout>

                    <Home />
                    <Skils />
                    <Expertise />
                    <Project />
                    <Contact />

                    <AsideBar />
                    
                </AppLayout>

            </UserDataContext>
        </ThemeContextProvider>
    )
}
