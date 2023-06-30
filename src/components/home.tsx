import React, { Component, createRef } from "react";
import { styles } from "./style";
import Menu from "./menu";
import { IMenus, IMovie } from "../App";
import Movie from "./movie";

interface HomeProps {
  menus: IMenus[];
  movies: IMovie[];
  notFound: boolean;
  search: (text: string) => void;
  handleMenuClick: (id: string, name: string) => void;
  all: () => void;
}
export default class Home extends Component<HomeProps> {
  inputRef = createRef<HTMLInputElement>();
  render() {
    const { menus, movies, handleMenuClick, notFound, all, search } =
      this.props;
    const moviesCounter = movies.length;
    return (
      <div className="p-[50px]  flex justify-between gap-[30px] bg-[#0D0D12] h-[calc(100vh-80px)]">
        <div className="memus overflow-auto w-1/3 h-full bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col text-center gap-[10px]">
          <div
            className={`menu ${styles.center} w-full h-[50px] bg-[#151719] border-[1px] border-[#44444598] text-[25px] rounded-[10px] font-chillax cursor-pointer`}
            onClick={all}
          >
            All movies
          </div>
          {menus.map((data) => (
            <Menu
              data={data}
              key={data._id}
              handleMenuClick={handleMenuClick}
            />
          ))}
        </div>
        <div className="movies w-full h-full bg-[#1e1e21] rounded-[20px] p-[20px]">
          <div
            className={`movie w-full left-[20px] top-0  h-[50px] rounded-[10px] ${styles.center} justify-between px-[20px] pl-[20px] text-[22px]`}
          >
            <div className="w-full flex gap-12">
              <input
                type="search"
                ref={this.inputRef}
                onChange={() => {
                  if (this.inputRef.current) {
                    search(this.inputRef.current.value);
                  }
                }}
                className="rounded-[20px] w-[350px] h-[40px] px-[15px] outline-none bg-[#151719] border-[1px] border-[#44444598] placeholder:text-[18px]"
                placeholder="Movie search..."
              />

              <div>{notFound ? 0 : moviesCounter} movies found</div>
            </div>
          </div>
          <div
            className={`movie w-full left-[20px] top-0  h-[50px] rounded-[10px] ${styles.center} justify-between px-[20px] pl-[20px] text-[22px]`}
          >
            <div className="w-full">Title</div>
            <div className="w-[300px]">Genre</div>
            <div className="w-[143px]">Stock</div>
            <div className="w-[143px]">Rate</div>
          </div>
          <div className="relative overflow-auto w-full h-[calc(100%-50px)]">
            {notFound ? (
              <div className="text-center text-[35px]  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-associate">
                No movies found.
              </div>
            ) : (
              movies.map((data) => <Movie data={data} key={data._id} />)
            )}
          </div>
        </div>
      </div>
    );
  }
}
