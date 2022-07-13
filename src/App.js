import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import {
  PageHeader,
  BigTextBold,
  Chip,
  DataPanel,
  DataItem,
  FeedbackNotification
} from '@toqio/toqio-web-components';

import './App.css';


const isEmpty = (obj) => Object.keys(obj).length === 0;


function App() {

  const [userInfo, setUserInfo] = useState({});

  // Get JWT from TOQIO
  useEffect(() => {
    window.addEventListener("message", function (event) {
      // If it is not a JWT event we do nothing
      if (event?.data?.id !== 'toqio-jwt') {
        return;
      } else if (event?.data?.jwt) {
        setUserInfo(jwt_decode(event.data.jwt));
      }
    });

  }, []);



  return (
    <div className="app-container">
      {/* PAGE HEADER */}
      <PageHeader
        title={'This is a plugin'}
        showDivider={true}
      />

      {/* SUCCESSFULLY CONNECTED */}
      {!isEmpty(userInfo) &&
        <FeedbackNotification
          className="feedback-notification"
          message="The connexion has been established. You can start using your JWT!"
          onClose={() => { }}
          variant="success"
        />
      }

      {/* CONEXION ERROR */}
      {isEmpty(userInfo) &&
        <FeedbackNotification
          className="feedback-notification"
          message="Sorry, the conexion has failed."
          onClose={() => { }}
          variant="error"
        />
      }

      {/* INFO PANEL */}
      <DataPanel>
        <BigTextBold>Welcome {userInfo?.data?.firstName} {userInfo?.data?.lastName}</BigTextBold>

        {/* AUTH STATUS */}
        <DataItem
          label="Auth status:"
          value={!isEmpty(userInfo)
            ? <Chip>Connected</Chip>
            : <Chip variant='danger'>Not Connected</Chip>}
        />

        {/* USER ID */}
        <DataItem
          label="User id:"
          value={userInfo.user_id}
        />

        {/* COMPANY ID */}
        <DataItem
          label="Company id:"
          value={userInfo.company_id}
        />

        {/* ROLE */}
        <DataItem
          label="Role:"
          value={userInfo.role}
        />
      </DataPanel>
    </div>
  );
}

export default App;
