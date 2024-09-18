import { RouterProvider } from 'react-router-dom';
import { router } from './config/Routes/routes';

export const App = () => {
    return <RouterProvider router={router} />;
};
