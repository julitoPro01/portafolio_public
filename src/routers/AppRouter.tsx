import { Contact, Home, Project, Skils } from "../pages"
import { AppLayout } from "../layout/AppLayout"
import { ThemeContextProvider } from "../context/UserThemeContext"
import { AsideBar } from "../components"
import { FC } from "react"

export const AppRouter:FC = () => {

    return (
            <ThemeContextProvider>
                <AppLayout>

                    <Home/>
                    {/* <Skils/> */}
                    <Project/>
                    <Contact/>
                    
                    <AsideBar/>
                </AppLayout>
            </ThemeContextProvider>
    )
}
