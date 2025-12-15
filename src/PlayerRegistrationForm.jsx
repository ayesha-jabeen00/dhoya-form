import { useState } from "react";
import "./PlayerRegistrationForm.css";

export default function PlayerRegistrationForm() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        photo: null,
        fullName: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

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
                            src="src/assets/retouch_2025112713041441[2].jpg"
                            alt="Dhoya Premiere League Logo"
                            className="league-logo-img"
                        />
                    </div>

                    <h1 className="form-title">DHOYA PREMIERE LEAGUE</h1>
                    <p className="form-subtitle">SEASON - 7</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    {/* Photo */}
                    <div className="form-group photo-upload-group">
                        <label>Player Photo</label>

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
                                    <img src={photoPreview} alt="Preview" className="photo-preview" />
                                ) : (
                                    <div className="upload-placeholder">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="28"
                                            height="28"
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
                                        <span>Upload Photo</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>



                    {/* Name */}
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Village */}
                    <div className="form-group">
                        <label>Village *</label>
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
                        <label>Panchayat</label>
                        <input
                            type="text"
                            name="panchayat"
                            placeholder="Enter panchayat name"
                            value={formData.panchayat}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Block */}
                    <div className="form-group">
                        <label>Block</label>
                        <input
                            type="text"
                            name="block"
                            placeholder="Enter block name"
                            value={formData.block}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Playing Role */}
                    <div className="form-group">
                        <label>Playing Role *</label>

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
                        <h3 className="section-title">Aadhaar Details (MANDATORY)</h3>

                        {/* Aadhaar Number */}
                        <div className="form-group">
                            <label>Aadhaar Number *</label>
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
                        Register Now
                    </button>
                </form>
            </div>
        </div>
    );
}
