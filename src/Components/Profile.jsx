import React, { useEffect, useState } from "react";
import {
  getCurrentUserProfile,
  getCurrenProfileThreads,
} from "../API/Firestore";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { uploadImage } from "../API/UploadImage";
import { AiOutlineEdit } from "react-icons/ai";
import { updateProfile } from "../API/Firestore";
import SingleThread from "./SingleThread";
import { Divider } from "antd";
import ProgressBar from "./Common/Progress";

export default function Profile() {
  let location = useLocation();
  let currentEmail = location?.state?.currentEmail;
  let localEmail = localStorage.getItem("userEmail");

  const [imageProgress, setImageProgress] = useState(0);
  const [currentProfile, setCurrentProfile] = useState([]);
  const [isBioEdit, setBioEdit] = useState(false);
  const [profileBio, setProfileBio] = useState("");
  const [currentProfileThreads, setCurrentThreads] = useState([]);
  const getProfile = async () => {
    await getCurrentUserProfile(currentEmail, setCurrentProfile);
  };

  const getProfileThreads = async () => {
    await getCurrenProfileThreads(currentEmail, setCurrentThreads);
  };

  const getImage = (event) => {
    uploadImage(
      event.target.files[0],
      location.state.currentID,
      setImageProgress
    );
  };

  useEffect(() => {
    getProfile();
    getProfileThreads();
  }, []);

  const updateUser = async () => {
    updateProfile(profileId, { profileBio: profileBio });
    await setProfileBio("");
    await setBioEdit(false);
  };
  console.log(currentProfileThreads);
  let profileName = currentProfile[0]?.name;
  let profileImage = currentProfile[0]?.profileImage;
  let profileId = currentProfile[0]?.id;
  let profilebio = currentProfile[0]?.profileBio;

  return (
    <div className="profile-main">
      <div className="profile-header">
        <div className="bio-edit">
          <h2 className="profile-name">
            {profileName}{" "}
            {localEmail === currentEmail && profilebio ? (
              <AiOutlineEdit
                size={25}
                className="react-icon"
                onClick={() => setBioEdit(!isBioEdit)}
              />
            ) : (
              <></>
            )}
          </h2>
          <p className="user-bio">{profilebio}</p>

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

        <div>
          <div className="upload-btn-wrapper">
            {profileImage ? (
              <img
                onChange={getImage}
                src={profileImage}
                className="profile-image"
              />
            ) : profilebio ? (
              <Button
                className="upload-btn"
                type="primary"
                shape="circle"
                icon={<UploadOutlined />}
              />
            ) : (
              <></>
            )}
            <input type="file" name="myfile" onChange={getImage} />
          </div>
          <div className="progress-bar">
            <ProgressBar imageProgress={imageProgress} />
          </div>
        </div>
      </div>

      <div className="profile-threads">
        {currentProfileThreads.map((thread, index) => (
          <div key={index}>
            <SingleThread thread={thread} />
            <Divider className="divider" />
          </div>
        ))}
      </div>
    </div>
  );
}
