export const baseURL = "https://pdp-movies-78.onrender.com/api";
export interface IMenus {
  name: string;
  _id: string;
}
export interface HomeBackProps {
  home: () => void;
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
}

export interface HeaderProps {
  onRegister: () => void;
  onLogin: () => void;
  user: IUser | null;
  adminPanel: () => void;
}

export interface HomeProps {
  menus: IMenus[];
  movies: IMovie[];
  notFound: boolean;
  search: (text: string) => void;
  handleMenuClick: (id: string, name: string) => void;
  all: () => void;
}
export interface HomeState {
  currentPage: number;
  moviesPerPage: number;
}

export interface RegisterProps extends HomeBackProps {
  onRegisterSubmit: (e: React.FormEvent<HTMLFormElement>, username: string, password: string, name: string) => void;
}

export interface MenuProps {
  data: IMenus;
  handleMenuClick: (id: string, name: string) => void;
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
}

export interface PanelProps {
  select: (value: string) => void;
}
