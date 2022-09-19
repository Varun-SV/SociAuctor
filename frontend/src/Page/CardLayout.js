import { Card, CardContent, Typography } from "@mui/material";
import './styles/FundingDashboard.css';
import React from "react";
import { useEffect, useState } from 'react'
import './styles/FundingDashboard.css';
import { motion } from "framer-motion";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import { Carousel } from 'react-responsive-carousel';


function CardLayout(list) {
    function Card_pop(){
        return(
            <div>
                <div class="sell" id="sell">
                <div class="sell-head">
                    <div class="title">Sell Your Craft</div>
                    <button data-close-button class="close-button">&times;</button>
                </div>
                </div>
                <div id="overlay"></div>
            </div>
        );
        }
    console.log(list);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'coloumn',
        }}
        >
            <Popup trigger={
                <Card className="cards"
                    id="cards"
                    style={{
                        width: "45%",
                        backgroundColor: "white",
                        borderRadius: 10,
                        border: "5px solid #E5E5E5",
                        marginBottom: "5px",

                    }}
                >
                    <CardContent>
                        <div
                            style={{
                                display: 'fixed',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                style={{
                                    align: "center",
                                    fontWeight: "bold",
                                    fontSize: 20,
                                }}
                            >
                                {list[0]}
                            </Typography>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        >
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"

                            >
                                {"Category : " + list[1]}
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: 14,

                                }}
                                color="textSecondary"

                            >
                                {"Required Amount"}
                            </Typography>
                        </div>
                        <div
                            style={{
                                textAlign: "right",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: 14,

                                }}
                                color="textSecondary"

                            >
                                {list[2] + " " + list[3]}
                            </Typography>
                        </div>
                        <div
                            style={{
                                textAlign: "right",
                            }}
                        >
                            <Popup trigger={<button> Donate </button>}
                                position="center">
                                <div
                                    style={{
                                        disply: "inline-block",
                                        // width: "100%",
                                        top: "25%",
                                        left: "25%",
                                        position: "absolute",
                                        backgroundColor: "white",
                                        border: "2px solid #000",
                                        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
                                        padding: "50px",
                                        borderRadius: "10px",
                                        overflow:'scroll'
                                    }}
                                >
                                    Here is put some donation
                                </div>
                            </Popup>
                        </div>
                    </CardContent>
                </Card>
            }
                position="center"
                background-color="grey"
            >
                <div
                    style={{
                        disply: "flex",
                        // width: "100%",
                        position: "fixed",
                        backgroundColor: "white",
                        border: "2px solid #000",
                        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
                        padding: "50px",
                        borderRadius: "10px",
                        overflow:"scroll"
                    }}
                >
                    <div
                        style=
                        {{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "left",
                            top: "0%"

                        }}
                    >
                        Flex direction towards right
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <script type="text/javascript" src="https://apiv2.popupsmart.com/api/Bundle/392343" async></script>
                    <div>
                        <Carousel>
                            <div>
                                <img src="./assets/1.png"/>
                            </div>
                            <div>
                                <img src="./assets/2.gif"/>
                            </div>
                        </Carousel>
                    </div>
                    Hello {list[0]}
                </div>
            </Popup>
        </div>
    );

}
export default CardLayout;

