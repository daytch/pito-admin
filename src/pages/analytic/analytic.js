import React, { useState, useEffect } from "react";
import DayVisitsReport from "./dayVisitsReport";
import CountriesReport from "./countriesReport";
import PageviewsReport from "./pageviewReport";
import SourceReport from "./sourceReport";
import BrowsersReport from "./browsersReport";
import DevicesReport from "./devicesReport";
import Sidebar from 'components/SideNavbar'
import { LastRow } from "./styles";
import { gapi } from 'gapi-script'
import styled from 'styled-components'
import { renderButton, checkSignedIn } from "api/google";
// import InputField from "../Components/input";

const Analytic = () => {
    const [viewId, setViewID] = useState('216813803')
    const [isSignedIn, setIsSignedIn] = useState(false);

    const updateSignin = (signedIn) => {
        setIsSignedIn(signedIn);
        if (!signedIn) {
            renderButton();
        }
    };

    useEffect(() => {
        window.gapi.load("auth2", init);
    });


    const init = () => {
        checkSignedIn()
            .then((signedIn) => {
                updateSignin(signedIn);
                window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        setViewID('216813803')
    }, [])
    return (
        <section className="flex flex-col xl:flex-row min-h-screen">
            <Sidebar />
            <div className="py-5 md:py-10 px-5 w-full">
                {
                    !isSignedIn ? (<>
                        <Title>Google Analytics Analytic</Title>
                        <ButtonContainer>
                            <div id="signin-button"></div>
                        </ButtonContainer></>) :
                        (<>
                            <DayVisitsReport
                                metric={"ga:users"}
                                title={"Users"}
                                viewId={viewId}
                            /><br />
                            <DayVisitsReport
                                metric={"ga:sessions"}
                                title={"Sessions"}
                                viewId={viewId}
                            /><br />
                            <CountriesReport viewId={viewId} /><br />
                            <PageviewsReport viewId={viewId} /><br />
                            <SourceReport viewId={viewId} /><br />
                            <LastRow>
                                <div className="w-1/2">
                                    <BrowsersReport viewId={viewId} />
                                </div>
                                <div className="w-1/2">
                                    <DevicesReport viewId={viewId} />
                                </div>
                            </LastRow>
                        </>)
                }
            </div>
        </section>
    );
};

export default Analytic;

const ButtonContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding-top: 10vmin;
  margin-top: 0;
`;
