import React, { Component, createRef } from "react";
import { styles } from "./style";
import Menu from "./menu";
import { HomeProps, HomeState } from "../components/utils";
import Movie from "./movie";

export default class Home extends Component<HomeProps, HomeState> {
  inputRef = createRef<HTMLInputElement>();
  state = {
    currentPage: 1,
    moviesPerPage: 4,
  };
  handlePageChange = (pageNumber: number) => {
    this.setState({ currentPage: pageNumber });
  };
  render() {
    const { menus, movies, handleMenuClick, notFound, all, search, activeMenu } = this.props;
    const { currentPage, moviesPerPage } = this.state;

    // Pagination calculations
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const moviesCounter = movies.length;
    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const shouldShowPagination = totalPages > 1;

    return (
      <div className="p-[30px]  flex justify-between gap-[30px] bg-[#0D0D12] h-[calc(100vh-70px)]">
        <div className="memus overflow-auto w-1/3 h-full bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col text-center gap-[10px]">
          <div
            className={`menu ${styles.center} w-full h-[50px] bg-[#151719] border-[1px] border-[#44444598] text-[25px] rounded-[10px] font-chillax cursor-pointer`}
            onClick={all}
          >
            All movies
          </div>
          {menus.map((data) => (
            <Menu data={data} key={data._id} handleMenuClick={handleMenuClick} activeMenu={activeMenu} />
          ))}
        </div>
        <div className="movies relative w-full h-full bg-[#1e1e21] rounded-[20px] p-[10px]">
          <div
            className={`movie  w-full left-[20px] top-0  h-[50px] rounded-[10px] ${styles.center} justify-between px-[10px] pl-[10px] text-[22px]`}
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
                className="rounded-[20px] w-[350px] h-[45px] px-[15px] outline-none bg-[#151719] border-[1px] border-[#44444598] placeholder:text-[18px]"
                placeholder="Movie search..."
              />

              <div>{notFound ? 0 : moviesCounter} movies found</div>
            </div>
          </div>
          <div
            className={`movie w-full left-[20px] top-0  h-[50px] rounded-[10px] ${styles.center} justify-between px-[10px] pl-[10px] text-[22px]`}
          >
            <div className="w-full">Title</div>
            <div className="w-[300px]">Genre</div>
            <div className="w-[143px]">Stock</div>
            <div className="w-[143px]">Rate</div>
          </div>
          <div className="relative overflow-auto w-full h-[calc(100%-150px)]">
            {notFound ? (
              <div className="text-center text-[35px]  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-associate">
                No movies found.
              </div>
            ) : (
              currentMovies.map((data) => <Movie data={data} key={data._id} />)
            )}
          </div>
          {/* <table className="w-full">
            <thead>
              <tr
                className={`movie text-center w-full left-[20px] top-0  h-[50px] rounded-[10px] ${styles.center} justify-between px-[10px] pl-[10px] text-[22px]`}
              >
                <th>Title</th>
                <th>Genre</th>
                <th>Username</th>
                <th>Stock</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {notFound ? (
                <div className="text-center text-[35px]  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-associate">
                  No movies found.
                </div>
              ) : (
                currentMovies.map((data) => <Movie data={data} key={data._id} />)
              )}
            </tbody>
          </table> */}
          {shouldShowPagination && (
            <div className="pagination flex gap-2 absolute bottom-[10px] left-[10px]">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => this.handlePageChange(index + 1)}
                  className={`page-number w-[45px] h-[35px] bg-[#151719] border-[1px] border-[#44444598]  rounded-[10px]${
                    currentPage === index + 1 ? "active rounded-[10px] text-white font-bold" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
