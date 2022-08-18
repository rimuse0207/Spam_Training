import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

const SpamAdminMainPageMainDivBox = styled.div`
    padding: 30px;
    background-color: #efefef;
    min-height: 100vh;
    table {
        font-size: 0.7em;
        position: relative;
        table-layout: fixed;
        width: 98vw;
    }

    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        table-layout: fixed;
    }
    table.type09 > thead > tr > th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border: none;
        border-bottom: 3px solid #036;
        background: #f3f6f7 !important;
        font-size: 0.7em;
        table-layout: fixed;
        width: 100px;
    }
    table.type09 tbody th {
        padding: 5px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
        width: 100px;
        table-layout: fixed;
    }
    table.type09 td {
        /* width: 300px; */
        padding: 2px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 1em;
        text-align: center;
        width: 100px;
        table-layout: fixed;
    }
`;

const SpamAdminMainPage = () => {
    const [UserData, setUserData] = useState([]);

    useEffect(() => {
        SendDataUser();
    }, []);

    const SendDataUser = async () => {
        try {
            const SendDataUserFromServer = await axios.get(`${process.env.REACT_APP_DB_HOST}/SpamTrain_app_server/Spam_User_Data`);

            if (SendDataUserFromServer.data.dataSuccess) {
                setUserData(SendDataUserFromServer.data.Spam_UserData_Rows);
            }
        } catch (error) {
            console.log(error);
            alert('Error발생');
        }
    };

    const handleClicks = async data => {
        try {
            const SendCheckUserData = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/SpamTrain_app_server/Spam_User_Checking_Cotact`,
                data
            );
            if (SendCheckUserData.data.dataSuccess) {
                setUserData(SendCheckUserData.data.Spam_UserData_Rows);
                alert('변경완료.');
            } else {
                alert('Error발생');
            }
        } catch (error) {
            console.log(error);
            alert('Error발생');
        }
    };

    return (
        <SpamAdminMainPageMainDivBox>
            <div>
                <table className="type09" id="CeCalendarTables">
                    <thead>
                        <tr>
                            <th>인덱스</th>
                            <th>이름</th>
                            <th>팀명</th>
                            <th>Email</th>
                            <th>IP 주소</th>
                            <th>클릭 시간</th>
                            <th>대응확인</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserData.map((list, i) => {
                            return (
                                <tr
                                    key={list.spam_click_user_indexs}
                                    style={list.spam_click_user_contact_check === 0 ? { background: '#b58a87' } : {}}
                                >
                                    <td>{i + 1}</td>
                                    <td>{list.name}</td>
                                    <td>{list.team}</td>
                                    <td>{list.spam_click_user_email}</td>
                                    <td>{list.spam_click_user_ip}</td>

                                    <td>{moment(list.spam_click_user_click_date).format('YYYY-MM-DD HH:mm:ss')}</td>
                                    <td>
                                        {list.spam_click_user_contact_check === 0 ? (
                                            <button onClick={() => handleClicks(list)}>연락 확인</button>
                                        ) : (
                                            `${moment(list.spam_click_user_contact_date).format('YYYY-MM-DD HH:mm:ss')}`
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </SpamAdminMainPageMainDivBox>
    );
};

export default SpamAdminMainPage;
