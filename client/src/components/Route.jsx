import {RouterProvider, createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import UserForm from "./UserForm.jsx";
import UserList from "./UserList.jsx";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/userlist',
      element: <UserList />
    },
    {
      path: '/user',
      element: <UserForm />
    },
    {
      path: '/add',
      element: <UserForm />
    },
    {
      path: '/edit/:id',
      element: <UserForm />
    }
]);

const Route = () => <RouterProvider router={router} />;

export default Route;