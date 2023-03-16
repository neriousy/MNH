import React from 'react';
import UserProfile from '../../components/UserProfile/UserProfile.jsx';
import UserSpecific from '../../components/UserSpecific/UserSpecific.jsx';

function Profile(){
  return(
    <>
      <UserProfile/>
      <UserSpecific/>
    </>
  );
}

export default Profile;