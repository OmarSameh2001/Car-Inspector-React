import React from "react";

export default function Home() {
  return (
    <div className="App-header" style={{textAlign:"center", backgroundColor:"#1b2024"}}>
      <h1>Car Parts Inspector</h1>
      <h5 className="col-md-7 pb-4">
        It is your ultimate safety companion, leveraging cutting-edge
        computer vision technology to ensure your well-being on the road. With
        its intuitive interface and powerful features, it offers
        unparalleled peace of mind for every journey.
      </h5>
      <img
        src={require("../../Assets/Gemini_Generated_Image (5)12.jpg")}
        alt=""
        style={{ width: "800px" }}
        className="img-fluid"
      />
    </div>
  );
}
