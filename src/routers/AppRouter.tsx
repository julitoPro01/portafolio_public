import { Contact, Expertise, Home, Project } from "../pages"
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


                    <div className="_pages">



                        <div className="_aside_bar">
                            
                            <AsideBar />
                        </div>
                        <div className="_content_" id="onScrollView">

                            <Home />
                            <Expertise />
                            <Project />
                            <Contact />
                        </div>

                    </div>


                </AppLayout>

            </UserDataContext>
        </ThemeContextProvider>
    )
}
