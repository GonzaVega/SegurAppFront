// import React, { createContext, useContext, useState } from "react";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";
// import axios from "axios";

// interface User {
//   name: string;
//   lastName: string;
//   email: string;
//   image: string | null;
// }

// interface AuthToken {
//   token: string | null;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: () => Promise<boolean>;
//   logout: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isAuthenticated: false,
//   login: async () => false,
//   logout: async () => {},
// });

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider: React.FC = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   const login = async (): Promise<any> => {
//     if (!isAuthenticated) {
//       try {
//         const response: any = await axios.get(
//           "https://www.googleapis.com/userinfo/v2/me",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         console.log("GET to google running", response);

//         const user = response.json();
//         await AsyncStorage.setItem("@user", JSON.stringify(user));
//         await AsyncStorage.setItem("authenticated", true);
//         await AsyncStorage.setItem("token", token);
//         setUser(user);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const logout = async (): Promise<any> => {};

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // const styles = StyleSheet.create({});
