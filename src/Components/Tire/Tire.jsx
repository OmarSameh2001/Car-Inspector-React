import React from "react";
import { useState } from "react";
import axios from "axios";
import background from "../../Assets/Gemini_Generated_Image (5)1.jpg";

export default function Tire() {
  const [images, setImages] = useState(null);
  const [apiResponse, setApiResponse] = useState(null); // State to store API response
  const [errorRes, setErrorRes] = useState(null);
  const [loading, setLoading] = useState(false);

  async function api(image) {
    try {
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: "https://classify.roboflow.com/tires-defects/1",
        params: {
          api_key: "774hK47NAVKaM8DBNmVA",
        },
        data: image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(response.data);
      setLoading(false);
      setApiResponse(response.data); // Set API response to state
    } catch (error) {
      console.log(error.message);
      setErrorRes(error.message);
      setLoading(false);
    }
  }
  async function apiup(image) {
    try {
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: "https://api.roboflow.com/dataset/tires-defects/1/upload",
        params: {
          api_key: "QuRHFDyEji9Ot0gCWQUR",
        },
        data: image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {}
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      setImages(base64String);
    };

    reader.readAsDataURL(file);
  };

  function hand() {
    api(images);
    apiup(images);
  }
  function resetStates() {
    setApiResponse(null);
    setImages(null);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="App-header"
    >
      {!images && <><h1 className="py-5">Kindly upload an image</h1>
      <input
        style={{ cursor: "pointer" }}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
      /></>}
      {images && !apiResponse && <h1 className="py-2">Press Upload to process your image</h1>}
      {images && apiResponse && <h1 className="py-2">Press reset to test new image</h1>}
      
      {images && (
        <div
          style={{
            marginTop: "20px",
            width: "500px",
            height: "400px",
            borderRadius: "8px",
          }}
        >
          <img
            src={`data:image/jpeg;base64,${images}`}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      {apiResponse ? (
        <div style={{ marginTop: "20px" }} className="row">
          <p className="col-auto">
            Your Tire is: {apiResponse.top}, with confidence{" "}
            {(parseFloat(apiResponse.confidence) * 100).toFixed(2)}%
          </p>

          {apiResponse.top === "Defected" && (
            <a
            href="https://www.fitandfix.com"
              className="col-auto btn bg-success text-white"
              style={{
                fontSize: "20px",
                color:"green"
              }}
              
            >
              Redirect to specialist
            </a>
          )}

          <button
            style={{margin:"20px"}}
            className="btn bg-danger text-white col-md4"
            onClick={resetStates}
          >
            Reset
          </button>
        </div>
      ) : (
        <button
          style={{ marginTop: "20px" }}
          className="btn bg-success text-white upload-button col-md-1"
          onClick={() => {
            hand();
            setErrorRes(null);
          }}
        >
          {loading ? "Loading..." : "Upload"}
        </button>
      )}
      {errorRes === "Request failed with status code 413" ? (
        <p className="bg-danger mt-3">The image is too large</p>
      ) : errorRes ? (
        <p className="bg-danger mt-3">An error occurred, please try again</p>
      ) : (
        <></>
      )}
    </div>
  );
}
