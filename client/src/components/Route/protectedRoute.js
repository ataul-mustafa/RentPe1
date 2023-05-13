// import { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Route, useNavigate } from "react-router-dom";


// const ProtectedRoute = ({ element: Element, ...rest}) =>{
//     const navigate = useNavigate();
//     const { loading, isAuthenticated, user} = useSelector((state)=>state.user);

//     return (
//         <Fragment>
//             {loading && (
//                 <Route
//                 {...rest}
//                     if (!isAuthenticated){
//                         return navigate("/login");
//                     }
//                     element={<Element />}
//                 />
//             )}
//         </Fragment>
//     )
// } 

// export default ProtectedRoute;