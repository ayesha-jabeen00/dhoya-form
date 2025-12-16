import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./PlayerRegistrationForm.css";

export default function PlayerRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    photo: null,
    fullName: "",
    email: "", // ✅ ADDED
    village: "",
    panchayat: "",
    block: "",
    playingRole: "",
    battingStyle: "",
    bowlingStyle: "",
    aadhaarNumber: "",
    aadhaarCard: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAadhaarCardUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData({ ...formData, aadhaarCard: file });
    }
  };
  const uploadToCloudinary = async (file, folder) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "dpl_uploads");
  data.append("folder", folder);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dxtmzketd/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();
  return result.secure_url; // ✅ DOWNLOADABLE LINK
};


  // ✅ UPDATED SUBMIT HANDLER WITH EMAILJS
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1️⃣ Upload Player Photo
    const playerPhotoUrl = formData.photo
      ? await uploadToCloudinary(formData.photo, "player_photos")
      : "";

    // 2️⃣ Upload Aadhaar File
    const aadhaarPhotoUrl = formData.aadhaarCard
      ? await uploadToCloudinary(formData.aadhaarCard, "aadhaar_files")
      : "";

    // 3️⃣ Prepare email data
    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      village: formData.village,
      panchayat: formData.panchayat,
      block: formData.block,
      playingRole: formData.playingRole,
      style:
        formData.battingStyle ||
        formData.bowlingStyle ||
        "N/A",
      aadhaarNumber: formData.aadhaarNumber,

      // ✅ CLOUDINARY DOWNLOAD LINKS
      playerPhotoUrl,
      aadhaarPhotoUrl,

      player_email: formData.email,
    };

    // 4️⃣ Send ADMIN email
    await emailjs.send(
      "service_o2hfhxb",
      "template_3e6l1p6",
      templateParams,
      "eLCe0UJU9NOTfI2JJ"
    );

    // 5️⃣ Send PLAYER confirmation email
    await emailjs.send(
      "service_o2hfhxb",
      "template_neuj3ks",
      templateParams,
      "eLCe0UJU9NOTfI2JJ"
    );

    setSubmitted(true);
  } catch (error) {
    console.error(error);
    alert("Submission failed. Please try again.");
  }
};


  // ✅ SUCCESS SCREEN (UNCHANGED)
  if (submitted) {
    return (
      <div className="form-page">
        <div className="success-container">
          <div className="success-icon">✔</div>
          <h1 className="success-title">Thank You!</h1>
          <p className="success-message">
            You submitted the form successfully. We’ll get back to you soon.
          </p>
          <button
            className="reset-button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                photo: null,
                fullName: "",
                email: "",
                village: "",
                panchayat: "",
                block: "",
                playingRole: "",
                battingStyle: "",
                bowlingStyle: "",
                aadhaarNumber: "",
                aadhaarCard: null,
              });
              setPhotoPreview(null);
            }}
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <div className="league-logo">
            <img
              src="/dhoya-logo.png"
              alt="Dhoya Premiere League Logo"
              className="league-logo-img"
            />
          </div>

          <h1 className="form-title">DHOYA PREMIERE LEAGUE</h1>
          <p className="form-subtitle">SEASON - 7</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* PHOTO */}
          <div className="form-group photo-upload-group">
            <label>PLAYER PHOTO</label>
            <div className="photo-upload-container">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="file-input"
              />
              <label htmlFor="photo" className="file-upload-label">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="photo-preview"
                  />
                ) : (
                  <div className="upload-placeholder">
                    <span>Upload Photo</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* FULL NAME */}
          <div className="form-group">
            <label>FULL NAME*</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL (NEW) */}
          <div className="form-group">
            <label>EMAIL*</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* VILLAGE */}
          <div className="form-group">
            <label>VILLAGE*</label>
            <input
              type="text"
              name="village"
              placeholder="Enter village name"
              value={formData.village}
              onChange={handleChange}
              required
            />
          </div>
                    {/* Panchayat */}
                    <div className="form-group">
                        <label>PANCHAYAT</label>
                        <input
                            type="text"
                            name="panchayat"
                            placeholder="Enter Panchayat Name"
                            value={formData.panchayat}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Block */}
                    <div className="form-group">
                        <label>BLOCK</label>
                        <input
                            type="text"
                            name="block"
                            placeholder="Enter Block Name"
                            value={formData.block}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Playing Role */}
                    <div className="form-group">
                        <label>PLAYING ROLE*</label>

                        <div className="radio-group">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="playingRole"
                                    value="batsman"
                                    checked={formData.playingRole === "batsman"}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="radio-label">Batsman</span>
                            </label>

                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="playingRole"
                                    value="bowler"
                                    checked={formData.playingRole === "bowler"}
                                    onChange={handleChange}
                                />
                                <span className="radio-label">Bowler</span>
                            </label>

                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="playingRole"
                                    value="wicketkeeper"
                                    checked={formData.playingRole === "wicketkeeper"}
                                    onChange={handleChange}
                                />
                                <span className="radio-label">Wicket Keeper</span>
                            </label>
                        </div>
                    </div>

                    {/* Batting / Bowling Style (Conditional) */}
                    {(formData.playingRole === "batsman" ||
                        formData.playingRole === "bowler") && (
                            <div className="form-group style-group">
                                <label>
                                    {formData.playingRole === "batsman"
                                        ? "Batting Style"
                                        : "Bowling Style"}
                                </label>

                                <div className="radio-group inline">
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name={
                                                formData.playingRole === "batsman"
                                                    ? "battingStyle"
                                                    : "bowlingStyle"
                                            }
                                            value="left"
                                            checked={
                                                (formData.playingRole === "batsman"
                                                    ? formData.battingStyle
                                                    : formData.bowlingStyle) === "left"
                                            }
                                            onChange={handleChange}
                                        />
                                        <span className="radio-label">Left</span>
                                    </label>

                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name={
                                                formData.playingRole === "batsman"
                                                    ? "battingStyle"
                                                    : "bowlingStyle"
                                            }
                                            value="right"
                                            checked={
                                                (formData.playingRole === "batsman"
                                                    ? formData.battingStyle
                                                    : formData.bowlingStyle) === "right"
                                            }
                                            onChange={handleChange}
                                        />
                                        <span className="radio-label">Right</span>
                                    </label>
                                </div>
                            </div>
                        )}


                    {/* Aadhaar */}
                    <div className="aadhaar-section">
                        <h3 className="section-title">AADHAAR DETAILS (MANDATORY)</h3>

                        {/* Aadhaar Number */}
                        <div className="form-group">
                            <label>AADHAAR NUMBBER*</label>
                            <input
                                type="text"
                                name="aadhaarNumber"
                                placeholder="Enter 12-digit Aadhaar number"
                                value={formData.aadhaarNumber}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        aadhaarNumber: e.target.value.replace(/\D/g, "").slice(0, 12),
                                    })
                                }
                                required
                            />
                        </div>

                        {/* Aadhaar Upload */}
                        <div className="form-group file-upload-group">
                            <input
                                type="file"
                                id="aadhaarCard"
                                accept="image/*,.pdf"
                                onChange={handleAadhaarCardUpload}
                                className="file-input"
                                required
                            />

                            <label htmlFor="aadhaarCard" className="file-upload-label-simple">
                                <div className={formData.aadhaarCard ? "file-selected" : "file-placeholder"}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>

                                    <span>
                                        {formData.aadhaarCard
                                            ? formData.aadhaarCard.name
                                            : "Upload Aadhaar Card (PDF or Image)"}
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>


                    <button type="submit" className="submit-button">
                        REGISTER NOW
                    </button>
                </form>
            </div>
        </div>
    );
}
