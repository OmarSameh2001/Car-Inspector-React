import React from "react";
import { useState } from "react";
import axios from "axios";
import background from "../../Assets/Gemini_Generated_Image (5)1.jpg";

export default function Caliper() {
  const [images, setImages] = useState(null);
  const [apiResponse, setApiResponse] = useState(null); // State to store API response
  const [errorRes, setErrorRes] = useState(null);
  const [loading, setLoading] = useState(false);

  async function api(image) {
    try {
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/brake-calipers/1",
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
      className="App-header  mx-auto"
    >
      {!images && (
        <>
          <h1 className="py-5">Kindly upload an image</h1>
          <input
            style={{ cursor: "pointer" }}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </>
      )}
      {images && !apiResponse && (
        <h1 className="py-2">Press Upload to process your image</h1>
      )}
      {images && apiResponse && (
        <h1 className="py-2">Press reset to test new image</h1>
      )}

      {images && (
        <div
          style={{
            marginTop: "20px",
            width: "500px",
            height: "400px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden", // Ensure bounding boxes are clipped within the image container
          }}
        >
          <img
            src={`data:image/jpeg;base64,${images}`}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {apiResponse &&
            apiResponse.predictions.map((prediction) => (
              <div
                key={prediction.detection_id}
                style={{
                  position: "absolute",
                  left: `${(prediction.x / apiResponse.image.width) * 100}%`,
                  top: `${(prediction.y / apiResponse.image.height) * 100}%`,
                  width: `${
                    (prediction.width / apiResponse.image.width) * 100
                  }%`,
                  height: `${
                    (prediction.height / apiResponse.image.height) * 100
                  }%`,
                  border:
                    prediction.class === "Good"
                      ? "2px solid green"
                      : "2px solid red",
                  boxSizing: "border-box",
                  transform: "translate(-50%, -50%)", // Center the bounding box
                }}
              />
            ))}
        </div>
      )}

      {apiResponse ? (
        <div style={{ marginTop: "20px" }} className="row mx-auto">
          {apiResponse.predictions.map((prediction) => (
            <div className="row">
              <p key={prediction.detection_id} className="col-auto">
                Your Brake Caliper is: {prediction.class}, with confidence{" "}
                {(prediction.confidence * 100).toFixed(2)}%
              </p>
              {prediction.class === "Bad" && (
                <a
                className="col-auto"
                  href="https://www.fiat.com.eg/en/contact-us"
                  target="_blank"
                  rel="noreferrer"
                  style={{color:"green"}}
                >
                  Click to redirect to specialist
                </a>
              )}
            </div>
          ))}

          <button
            style={{ margin: "20px" }}
            className="btn bg-danger text-white col-md4 mx-auto"
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
