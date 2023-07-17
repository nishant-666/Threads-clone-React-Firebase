import React, { useEffect, useState } from "react";
import { getCurrentUserProfile } from "../API/Firestore";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { uploadImage } from "../API/UploadImage";
import { AiOutlineEdit } from "react-icons/ai";
import { updateProfile } from "../API/Firestore";

export default function Profile() {
  let location = useLocation();
  let currentEmail = location?.state?.currentEmail;
  let localEmail = localStorage.getItem("userEmail");
  const [currentProfile, setCurrentProfile] = useState([]);
  const [isBioEdit, setBioEdit] = useState(false);
  const [profileBio, setProfileBio] = useState("");

  const getProfile = async () => {
    getCurrentUserProfile(currentEmail, setCurrentProfile);
  };

  const getImage = (event) => {
    uploadImage(event.target.files[0], location.state.currentID);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const updateUser = async () => {
    updateProfile(profileId, { profileBio: profileBio });
    await setProfileBio("");
    await setBioEdit(false);
  };

  let profileName = currentProfile[0]?.name;
  let profileImage = currentProfile[0]?.profileImage;
  let profileId = currentProfile[0]?.id;
  let profilebio = currentProfile[0]?.profileBio;

  return (
    <div className="profile-main">
      <div className="profile-header">
        <div>
          <h2 className="profile-name">{profileName}</h2>

          <div className="bio-edit">
            <p className="user-bio">{profilebio}</p>
            <AiOutlineEdit
              size={25}
              className="react-icon"
              onClick={() => setBioEdit(!isBioEdit)}
            />
          </div>
          {isBioEdit ? (
            <div className="bio-edit-container">
              <input
                className="bio-input"
                value={profileBio}
                onChange={(event) => setProfileBio(event.target.value)}
              />

              <button className="edit-profile" onClick={updateUser}>
                Save Bio
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        {localEmail === currentEmail ? (
          <div className="upload-btn-wrapper">
            {profileImage ? (
              <>
                <img
                  onChange={getImage}
                  src={profileImage}
                  className="profile-image"
                />

                <input type="file" name="myfile" onChange={getImage} />
              </>
            ) : (
              <>
                <Button
                  className="upload-btn"
                  type="primary"
                  shape="circle"
                  icon={<UploadOutlined />}
                />
                <input type="file" name="myfile" onChange={getImage} />
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
