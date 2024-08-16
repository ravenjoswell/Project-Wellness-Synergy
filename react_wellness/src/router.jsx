import { createBrowserRouter } from "react-router-dom";
import App from './App';
import AboutPage from "./pages/AboutPage";
import CookbookPage from "./pages/CookbookPage";
import DietPage from "./pages/DietPage";
import HomePage from "./pages/HomePage";
import JournalPage from "./pages/JournalPage";
import MindfullnessPage from "./pages/MindfullnessPage";
import RecipePage from "./pages/RecipePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotfoundPage from "./pages/NotfoundPage";
import { confirmUser } from './utilities'



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <AboutPage />
            },
            {
                path: 'home/',
                element: <HomePage />,
                loader: confirmUser,
            },
            {
                path: 'login/',
                element: <LoginPage />
            },
            {
                path: 'signup/',
                element: <SignupPage />
            },
            {
                path: 'cookbook/',
                element: <CookbookPage />,
                loader: confirmUser,
            },
            {
                path: 'diet/',
                element: <DietPage />,
                loader: confirmUser,
            },
            {
                path: 'journal/',
                element: < JournalPage/>,
                loader: confirmUser,
            },
            {
                path: 'mindfulness/',
                element: <MindfullnessPage />,
                loader: confirmUser,
            },
            {
                path: 'recipe/',
                element: <RecipePage />,
                loader: confirmUser,
            },
        ],
        errorElement: <NotfoundPage />
    }
])

export default router;