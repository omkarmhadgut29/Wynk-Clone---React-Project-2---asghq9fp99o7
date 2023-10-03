import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SelectPlan.css";
import PaymentProcess from "./PaymentProcess";
import { useSelector } from "react-redux";
import { currentPlanSelector } from "../../redux/subscription/subscriptionSlice";
import { Link, useNavigate } from "react-router-dom";
import { userSelector } from "../../redux/users/userSlice";

const SelectPlan = () => {
    const [isPaymentProcess, setIsPaymentProcess] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        validity: "Yearly",
        amount: 399,
    });

    const currentPlan = useSelector(currentPlanSelector);
    const userData = useSelector(userSelector);
    const user = userData ? userData.data : null;

    const navigate = useNavigate();

    const handleContinue = () => {
        setIsPaymentProcess(true);
    };

    const handleSubscriptionPlan = (validity, amount) => {
        setPaymentDetails({
            validity,
            amount,
        });
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, []);

    return (
        <>
            {user ? (
                isPaymentProcess ? (
                    <PaymentProcess paymentDetails={paymentDetails} />
                ) : (
                    <Box
                        component={"div"}
                        className="bg-[#0c0f12] min-h-[100vh] w-[100%] relative "
                    >
                        {/* w-full bg-[#1f272b] text-center relative p-[10px] box-border */}
                        <Box className="top-bg m-auto ">
                            <Link to={"/"}>
                                <img
                                    src="assets/images/Wynklogo-white.png"
                                    alt="Wynklogo-white"
                                    className="relative top-[30px] max-h-[35px] h-[35px] w-[185px] m-auto "
                                />
                            </Link>
                        </Box>

                        {currentPlan ? (
                            <>
                                <Box className="px-[20px] pb-[20px] relative top-[-23px] w-[30%] m-auto ">
                                    <Box className="text-[#bec1c2] bg-[#151a1f] shadow-md rounded-[12px] py-[20px] box-border mb-[26px] relative text-center px-[20px] ">
                                        <Box className="text-[#eb1d22] font-bold text-[24px] ">
                                            Subcription Details
                                        </Box>
                                        {/* ₹ */}
                                        {/* <Box className="pt-[30px] text-[18px] ">
                                                <Box>
                                                    <span className="pr-[20px] ">
                                                        Validity:
                                                    </span>
                                                    <span>{currentPlan.validity}</span>
                                                </Box>
                                                <Box>Amount: ₹{currentPlan.amount}</Box>
                                            </Box> */}

                                        <Box className="px-[20px] table-wraper ">
                                            <table className="w-full mt-[15px] mb-[20px] box-border border-collapse ">
                                                <tbody className="beforeCss ">
                                                    <tr>
                                                        <td
                                                            className="text-center "
                                                            style={{
                                                                fontSize: 18,
                                                            }}
                                                        >
                                                            Validity:
                                                        </td>
                                                        <td
                                                            className="text-center "
                                                            style={{
                                                                fontSize: 18,
                                                            }}
                                                        >
                                                            {
                                                                currentPlan.validity
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            className="text-center "
                                                            style={{
                                                                fontSize: 18,
                                                            }}
                                                        >
                                                            Amount:
                                                        </td>
                                                        <td
                                                            className="text-center "
                                                            style={{
                                                                fontSize: 18,
                                                            }}
                                                        >
                                                            ₹
                                                            {currentPlan.amount}
                                                        </td>
                                                    </tr>
                                                    {/* <tr></tr>
                                                <tr></tr> */}
                                                </tbody>
                                            </table>
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            // Offer container
                            <Box className="px-[20px] pb-[20px] relative top-[-100px] w-[55%] m-auto ">
                                {/* Offer container */}
                                {/* Offer card */}
                                <Box className="bg-[#151a1f] shadow-md rounded-[12px] py-[20px] box-border mb-[26px] relative ">
                                    {/*Card header */}
                                    <Box className="text-center px-[20px] ">
                                        {/* header title */}
                                        <Box className="flex justify-center h-[29.6px] ">
                                            <p className="font-bold text-[#eb1d22] text-ellipsis overflow-hidden whitespace-nowrap text-[24px] ">
                                                Go Premium
                                            </p>
                                            <img
                                                src="assets/images/red-crown.png"
                                                alt="red-crown"
                                                className="ml-[8px] w-[25px] "
                                            />
                                        </Box>
                                        <small className="text-[#bec1c2] text-[14px] ">
                                            Get the best of music & podcasts
                                        </small>
                                    </Box>

                                    {/* table-wraper */}
                                    <Box className="px-[20px] table-wraper ">
                                        <table className="w-full mt-[15px] mb-[20px] box-border border-collapse ">
                                            <thead className="border-[#1f272b] border-[1px] border-solid ">
                                                <tr>
                                                    <th className="italic font-bold text-[#818c94] py-[10px] text-[14px] text-left ">
                                                        Benefits
                                                    </th>
                                                    <th className="italic font-bold text-[#818c94] py-[10px] text-[14px] w-[50px] text-center ">
                                                        Now
                                                    </th>
                                                    <th className="italic font-bold py-[10px] text-[14px]  text-[#eb1d22] text-center ">
                                                        Premium
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="beforeCss ">
                                                <tr>
                                                    <td className="text-left  ">
                                                        Unlimited Streaming
                                                    </td>
                                                    <td className="text-center">
                                                        <img
                                                            src="assets/images/red-tick.png"
                                                            alt="red-tick"
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <img
                                                            src="assets/images/red-tick.png"
                                                            alt="red-tick"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left  ">
                                                        Unlimited Downloads
                                                    </td>
                                                    <td className="text-center">
                                                        <img
                                                            src="assets/images/red-tick.png"
                                                            alt="red-tick"
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <img
                                                            src="assets/images/red-tick.png"
                                                            alt="red-tick"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left  ">
                                                        Ad-free Music
                                                    </td>
                                                    <td className="text-center">
                                                        <img
                                                            src="assets/images/red-tick.png"
                                                            alt="red-tick"
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <img
                                                            src="assets/images/red-tick.png"
                                                            alt="red-tick"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* <tr></tr>
                                                <tr></tr> */}
                                            </tbody>
                                        </table>
                                    </Box>

                                    {/* plan-wrapper */}
                                    <Box className="flex justify-center flex-wrap px-[7.5px] items-center ">
                                        <Box
                                            className={`mr-[24px]`}
                                            onClick={() =>
                                                handleSubscriptionPlan(
                                                    "Yearly",
                                                    399
                                                )
                                            }
                                        >
                                            <Box
                                                className={`plans-cards ${
                                                    paymentDetails.amount ===
                                                    399
                                                        ? "selected-cards"
                                                        : "not-selected-cards"
                                                } `}
                                            >
                                                <Box className="best__value">
                                                    <span>Best Value</span>
                                                </Box>
                                                <img
                                                    src={`${
                                                        paymentDetails.amount ===
                                                        399
                                                            ? "assets/images/tick-mark.png"
                                                            : "assets/images/white-tick.png"
                                                    }`}
                                                    alt="red-tick"
                                                />
                                                <p className="period">Yearly</p>

                                                <p className="price">
                                                    <span className="original-price">
                                                        ₹999
                                                    </span>
                                                    <span className="paybale-price">
                                                        ₹399
                                                    </span>
                                                </p>
                                                <p className="text-[12px]">
                                                    Save 60%
                                                </p>
                                            </Box>
                                        </Box>

                                        <Box
                                            className={`mr-[24px]`}
                                            onClick={() =>
                                                handleSubscriptionPlan(
                                                    "3 Months",
                                                    129
                                                )
                                            }
                                        >
                                            <Box
                                                className={`plans-cards ${
                                                    paymentDetails.amount ===
                                                    129
                                                        ? "selected-cards"
                                                        : "not-selected-cards"
                                                } `}
                                            >
                                                <img
                                                    src={`${
                                                        paymentDetails.amount ===
                                                        129
                                                            ? "assets/images/tick-mark.png"
                                                            : "assets/images/white-tick.png"
                                                    }`}
                                                    alt="red-tick"
                                                />
                                                <p className="period">
                                                    3 Months
                                                </p>

                                                <p className="price">
                                                    <span className="original-price">
                                                        ₹289
                                                    </span>
                                                    <span className="paybale-price">
                                                        ₹129
                                                    </span>
                                                </p>
                                                <p className="text-[12px]">
                                                    Save 55%
                                                </p>
                                            </Box>
                                        </Box>

                                        <Box
                                            className={`mr-[24px]`}
                                            onClick={() =>
                                                handleSubscriptionPlan(
                                                    "Monthly",
                                                    49
                                                )
                                            }
                                        >
                                            <Box
                                                className={`plans-cards ${
                                                    paymentDetails.amount === 49
                                                        ? "selected-cards"
                                                        : "not-selected-cards"
                                                } `}
                                            >
                                                <img
                                                    src={`${
                                                        paymentDetails.amount ===
                                                        49
                                                            ? "assets/images/tick-mark.png"
                                                            : "assets/images/white-tick.png"
                                                    }`}
                                                    alt="red-tick"
                                                />
                                                <p className="period">
                                                    Monthly
                                                </p>

                                                <p className="price">
                                                    <span className="original-price">
                                                        ₹99
                                                    </span>
                                                    <span className="paybale-price">
                                                        ₹49
                                                    </span>
                                                </p>
                                                <p className="text-[12px]">
                                                    Save 50%
                                                </p>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="text-[#bec1c2] text-[14px] ">
                                    <li className="pl-[20px] indent-[-16px] ">
                                        All amounts are inclusive of 18% GST
                                    </li>
                                    <li className="pl-[20px] indent-[-16px] ">
                                        By clicking on Continue button, you
                                        agree to Wynk’s Terms of serviceand
                                        Privacy policy.
                                    </li>
                                </Box>

                                <Box className="amount-to-pay">
                                    <Box>
                                        <p className="font-bold text-[#818c94] text-[16px] ">
                                            Amount to be paid
                                        </p>
                                        <small className="text-[#bec1c2] text-[14px] ">
                                            ₹{paymentDetails.amount}
                                        </small>
                                    </Box>
                                    <Box>
                                        <button onClick={handleContinue}>
                                            Continue
                                        </button>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>
                )
            ) : (
                <></>
            )}
        </>
    );
};

export default SelectPlan;
