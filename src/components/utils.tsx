export const baseURL = "https://pdp-movies-78.onrender.com/api";
export interface IMenus {
  name: string;
  _id: string;
}
export interface HomeBackProps {
  onNavigate: (pathname: string) => void;
}
export interface IMovie {
  _id: string;
  title: string;
  genre: {
    name: string;
    _id: string;
  };
  numberInStock: number;
  dailyRentalRate: number;
  username: string;
}

export interface HeaderProps {
  onRegister: () => void;
  onLogin: () => void;
  user: IUser | null;
  adminPanel: () => void;
  onNavigate: (pathname: string) => void;
}

export interface HomeProps {
  menus: IMenus[];
  movies: IMovie[];
  notFound: boolean;
  search: (text: string) => void;
  handleMenuClick: (id: string) => void;
  all: () => void;
  activeMenu: boolean;
}
export interface HomeState {
  currentPage: number;
  moviesPerPage: number;
}

export interface RegisterProps {
  onNavigate: (pathname: string) => void;
}

export interface MenuProps {
  data: IMenus;
  handleMenuClick: (id: string) => void;
  activeMenu: boolean;
}

export interface MovieProps {
  data: IMovie;
}

export interface IUser {
  email: string;
  name: string;
  _id: string;
}
export interface AppState {
  menus: IMenus[];
  movies: IMovie[];
  filteredMovies: IMovie[];
  registerBtn: boolean;
  loginBtn: boolean;
  notFound: boolean;
  currentUser: IUser | null;
  adminPanel: boolean;
  addSelect: string | null;
  activeMenu: boolean;
  pathname: string;
}

// export interface PanelProps {
//   select: (value: string) => void;
// }
