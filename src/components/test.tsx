import React, { Component } from "react";
import axios from "axios";

export default class Test extends Component {
  handleSubmit = async () => {
    // const { data } = await axios.post(
    //   `https://pdp-movies-78.onrender.com/api/users/`,
    //   {
    //     name: "test7",
    //     email: "test7@gmail.com",
    //     password: "testpassword7",
    //   }
    // );
    // console.log(data);

    const { data } = await axios.post(
      `https://pdp-movies-78.onrender.com/api/auth/`,
      {
        email: "ars@domain.com",
        password: "root123",
      }
    );
    console.log(data);
  };
  render() {
    return <div onClick={this.handleSubmit}>Submit</div>;
  }
}
