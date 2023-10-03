import {
    Add,
    ArrowBack,
    CreditCard,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./PaymentProcess.css";
import { useDispatch } from "react-redux";
import { addSubscriptionPlan } from "../../redux/subscription/subscriptionSlice";
import { useNavigate } from "react-router-dom";

const PaymentProcess = ({ paymentDetails }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardName, setCardName] = useState("");
    const [isCard, setIsCard] = useState(false);
    const [upiId, setUpiId] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function isValid_UPI_ID(upi_Id) {
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/;
        if (upi_Id == null || upi_Id === "") {
            return false;
        }
        if (regex.test(upi_Id)) {
            return true;
        } else {
            return false;
        }
    }

    const handleCardNumberChange = (event) => {
        if (event.target.value.length < cardNumber.length) {
            setCardNumber(event.target.value);
        } else if (/[0-9 ]/.test(event.target.value.slice(-1))) {
            const value = event.target.value.replace(/[^\d]/g, "");
            // const value = event.target.value;
            let formattedValue = "";

            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += " ";
                }
                formattedValue += value.charAt(i);
            }

            setCardNumber(formattedValue.trim());
        }
    };

    const handleCardExpiry = (event) => {
        const lastDigit = event.target.value.slice(-1);
        if (event.target.value.length < cardExpiry.length) {
            if (cardExpiry.length === 3) {
                setCardExpiry((prev) => prev.slice(0, 1));
            } else {
                setCardExpiry(event.target.value);
            }
        } else if (/[0-9 ]/.test(lastDigit)) {
            const value = event.target.value.replace(/[^\d]/g, "");
            // console.log("value /[0-9 ]/: " + value);
            if (value.length === 1) {
                if (lastDigit === "1" || lastDigit === "0") {
                    setCardExpiry(`${lastDigit}`);
                } else {
                    setCardExpiry(`0${lastDigit}/`);
                }
            } else {
                if (
                    value.length === 2 &&
                    cardExpiry === "1" &&
                    (lastDigit === "0" ||
                        lastDigit === "1" ||
                        lastDigit === "2")
                ) {
                    setCardExpiry(`${event.target.value}/`);
                } else if (value.length != 2 && value.length < 5) {
                    setCardExpiry(`${event.target.value}`);
                } else if (cardExpiry === "0" && lastDigit != 0) {
                    setCardExpiry(`${event.target.value}/`);
                }
            }
        }
    };

    const handleIsCard = () => {
        setIsCard((prev) => !prev);
    };

    const handleUPIPay = () => {
        if (isValid_UPI_ID(upiId)) {
            Swal.fire("Success", "Payment Successful", "success");
        } else {
            Swal.fire("Payment Failure", "Enter Valid UPI ID", "error");
        }
    };

    const isValidCardPay = () => {
        if (
            cardNumber.length === 19 &&
            cardCVV.length === 3 &&
            cardExpiry.length === 5 &&
            cardName.length > 1
        ) {
            return true;
        }

        return false;
    };

    const handlePay = () => {
        dispatch(addSubscriptionPlan(paymentDetails));
        Swal.fire("Success", "Payment Successful", "success");
        navigate("/");
    };

    const handleCardPay = () => {
        Swal.fire("Success", "Payment Successful", "success");
    };
    return (
        <>
            {/* bg-[#191919] */}
            <Box className="!bg-[#f8f8f9] min-h-[100vh] ">
                {/* Header */}
                <Box className=" ">
                    {/* #212121 */}
                    {/* Navbar */}
                    <Box className="bg-[#1a1a1d] text-white h-[74px] px-[16px] py-[10px] w-full flex justify-between items-center sticky top-0 z-[100] box-border text-[20px] font-[500]  ">
                        <Box className="max-[780px]:w-full ">
                            <img
                                src="assets/images/Wynklogo-white.png"
                                alt="Wynklogo-white"
                                className=" w-[104px] ml-[50px] max-[780px]:ml-[10px] "
                            />
                        </Box>

                        {/* Center heading */}
                        <Box className="min-[780px]:self-center flex justify-center max-[780px]:justify-end max-[780px]:ml-[10px] items-center w-full flex-grow flex-shrink ">
                            <Box>
                                <span>Pay Securely</span>
                            </Box>
                        </Box>

                        <Box className="w-[20%] max-[780px]:hidden "></Box>
                    </Box>

                    {/* Body */}
                    <Box className="flex justify-center max-[780px]:flex-col max-[780px]:items-center flex-grow flex-shrink ">
                        {/* Pay */}
                        <Box className="w-[500px] max-[550px]:w-[400px] max-[430px]:w-full min-[780px]:hidden mt-[54px] h-auto ">
                            <Box className="rounded-[12px] border-[1px] border-solid border-[#e2e2e5] min-h-[50px] p-[16px] max-[410px]:mx-[10px] mb-[20px] flex justify-center flex-col bg-[#ffffff] ">
                                <Box className="text-[#1a1a1d] text-[24px] font-[600] leading-[32px] ">
                                    Pay ₹{paymentDetails.amount}
                                </Box>
                                <Box className="text-[#878793] text-[14px] font-[400] leading-[24px] capitalize flex items-center ">
                                    <span>WYNK MUSIC</span>
                                    <span className="w-[4px] h-[4px] bg-[#1a1a1d] text-[#1a1a1d] mx-[5px] rounded-[50%] "></span>
                                    <span>{paymentDetails.validity}</span>
                                </Box>
                            </Box>
                        </Box>

                        <Box className="w-[50%] max-[780px]:w-[500px] max-[550px]:w-[400px] max-[430px]:w-full mt-[54px] max-[780px]:mt-[10px] min-[780px]:ml-[5%] h-auto ">
                            {/* Payment List */}
                            <Box>
                                <Box className="rounded-[12px] border-[1px] border-solid border-[#e2e2e5] bg-[#ffffff] mb-[10px] pt-[24px] px-[16px] max-[410px]:px-[5px] max-[410px]:mx-[10px] pb-[4px] flex flex-col ">
                                    <span className="flex items-center uppercase text-[#6c6c78] text-[14px] pb-[5px] leading-[20px] ">
                                        <span>Pay With</span>
                                        <img
                                            src="assets/images/UPI.png"
                                            alt="UPI"
                                            className="w-[38px] h-[10px] ml-[5px]  "
                                        />
                                    </span>

                                    {/* list items */}

                                    <Box className="text-[#1a1a1d] text-[16px] leading-[24px] relative cursor-pointer flex flex-col ">
                                        <Box className="flex items-center">
                                            <Box className="flex h-[40px] max-[410px]:h-[20px] w-[40px] max-[410px]:w-[20px] mr-[16px] max-[410px]:mr-[5px] text-center items-center justify-center ">
                                                <Add className="text-[30px] max-[410px]:text-[20px] " />
                                            </Box>

                                            <Box
                                                className="text-[16px] leading-[24px] py-[24px] box-border flex justify-between "
                                                style={{
                                                    width: "calc(100% - 56px)",
                                                }}
                                                onClick={handleIsCard}
                                            >
                                                <Box className="flex flex-col tracking-[0.05px] ">
                                                    Add a new UPI
                                                </Box>
                                                {/* <KeyboardArrowUp className="text-[#cfcfd4] " /> */}
                                                {!isCard ? (
                                                    <KeyboardArrowUp className="text-[#cfcfd4] " />
                                                ) : (
                                                    <KeyboardArrowDown className="text-[#cfcfd4] " />
                                                )}
                                            </Box>
                                        </Box>

                                        {/* input */}
                                        {!isCard && (
                                            <Box className="pl-[56px] max-[410px]:pl-[20px] pb-[16px] overflow-hidden h-auto transition-all duration-200 ease-in-out ">
                                                <Box>
                                                    <input
                                                        type="text"
                                                        onChange={(e) =>
                                                            setUpiId(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Enter UPI ID. Eg: 9876543210@upi"
                                                        className="w-[100%] box-border bg-[#fafafa] border-[1px] border-solid border-[#1a1a1d] rounded-[4px] p-[12px] mb-[10px] focus-visible:outline-none h-[41px] text-[14px] "
                                                    />

                                                    {/* bg-[#58585f] text-[#9a9393] */}
                                                    <button
                                                        className={`w-[100%] flex flex-row justify-center items-center mt-[12px] rounded-[4px] text-[14px] font-[600]  p-[12px] border-[1px] [word-spacing:3px] bg-[#1a1a1d] text-[#fff] ${
                                                            isValid_UPI_ID(
                                                                upiId
                                                            )
                                                                ? "bg-[#1a1a1d] text-[#fff] cursor-pointer"
                                                                : "bg-[#58585f] text-[#d4d4d4] cursor-not-allowed"
                                                        } `}
                                                        onClick={() =>
                                                            handlePay()
                                                        }
                                                        disabled={
                                                            !isValid_UPI_ID(
                                                                upiId
                                                            )
                                                        }
                                                    >
                                                        Continue To Pay ₹
                                                        {paymentDetails.amount}
                                                    </button>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>

                                <Box></Box>
                            </Box>

                            {/* Other Options */}
                            <Box>
                                <Box className="rounded-[12px] border-[1px] border-solid border-[#e2e2e5] bg-[#ffffff] mb-[10px] pt-[24px] px-[16px] max-[410px]:px-[0px] max-[410px]:mx-[10px] pb-[4px] flex flex-col ">
                                    <Box className="flex flex-col border-b-[0] px-[16px] pt-[24px] pb-[4px] ">
                                        <span className="uppercase text-[#6c6c78] text-[14px] pb-[5px] leading-[20px] ">
                                            Other Options
                                        </span>

                                        <Box className="text-[#1a1a1d] text-[16px] leading-[24px] relative cursor-pointer flex flex-col ">
                                            <Box className="flex items-center">
                                                <Box className="flex h-[40px] w-[40px] mr-[16px] text-center items-center justify-center ">
                                                    <CreditCard className="text-[30px] " />
                                                </Box>

                                                <Box
                                                    className="text-[16px] leading-[24px] py-[24px] box-border flex justify-between "
                                                    style={{
                                                        width: "calc(100% - 56px)",
                                                    }}
                                                    onClick={handleIsCard}
                                                >
                                                    <Box className="flex flex-col tracking-[0.05px] ">
                                                        Credit & Debit Cards
                                                    </Box>
                                                    {isCard ? (
                                                        <KeyboardArrowUp className="text-[#cfcfd4] " />
                                                    ) : (
                                                        <KeyboardArrowDown className="text-[#cfcfd4] " />
                                                    )}
                                                </Box>
                                            </Box>

                                            {/* Credit Card details */}
                                            {isCard && (
                                                <Box className="pl-[56px] max-[410px]:pl-[0px] pb-[16px] transition-all duration-200 ease-in-out overflow-hidden h-auto ">
                                                    <Box className="border-b-[0] relative top-0 bottom-0 z-[1] right-0 left-0 bg-white flex flex-col ">
                                                        <Box className="relative h-auto card_form ">
                                                            {/* Card Number */}
                                                            <Box className="relative">
                                                                <input
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                    className={`focus-visible:outline-none ${
                                                                        cardNumber !=
                                                                            "" &&
                                                                        "tracking-[.25em]"
                                                                    } `}
                                                                    placeholder="Card Number"
                                                                    pattern="\\d*"
                                                                    maxLength={
                                                                        19
                                                                    }
                                                                    minLength={
                                                                        4
                                                                    }
                                                                    value={
                                                                        cardNumber
                                                                    }
                                                                    // onKeyDown={(
                                                                    //     event
                                                                    // ) => {
                                                                    //     if (
                                                                    //         !/[0-9 ]/.test(
                                                                    //             event.key
                                                                    //         )
                                                                    //     ) {
                                                                    //         event.preventDefault();
                                                                    //     }
                                                                    //     if (
                                                                    //         event.key ===
                                                                    //         "Backspace"
                                                                    //     ) {
                                                                    //         setCardNumber(
                                                                    //             (
                                                                    //                 prev
                                                                    //             ) =>
                                                                    //                 prev.slice(
                                                                    //                     0,
                                                                    //                     prev.length -
                                                                    //                         1
                                                                    //                 )
                                                                    //         );
                                                                    //     }
                                                                    // }}
                                                                    onChange={(
                                                                        event
                                                                    ) => {
                                                                        // setCardNumber(
                                                                        //     event
                                                                        //         .target
                                                                        //         .value
                                                                        // );
                                                                        handleCardNumberChange(
                                                                            event
                                                                        );
                                                                    }}
                                                                />
                                                            </Box>

                                                            {/* Card Validity */}
                                                            <Box className="flex max-[350px]:flex-col  ">
                                                                {/* Card Expiry */}
                                                                <Box className="w-[65%] max-[350px]:w-[100%] mr-[5%] flex flex-col ">
                                                                    <input
                                                                        type="text"
                                                                        inputMode="numeric"
                                                                        className={`focus-visible:outline-none ${
                                                                            cardExpiry !=
                                                                                "" &&
                                                                            "tracking-[.25em]"
                                                                        } `}
                                                                        placeholder="Valid through (MM/YY)"
                                                                        pattern="\\d*"
                                                                        maxLength={
                                                                            5
                                                                        }
                                                                        minLength={
                                                                            4
                                                                        }
                                                                        value={
                                                                            cardExpiry
                                                                        }
                                                                        // onKeyDown={(
                                                                        //     event
                                                                        // ) => {
                                                                        //     handleCardExpiry(
                                                                        //         event
                                                                        //     );
                                                                        // }}
                                                                        onChange={(
                                                                            event
                                                                        ) => {
                                                                            handleCardExpiry(
                                                                                event
                                                                            );
                                                                        }}
                                                                    />
                                                                </Box>

                                                                {/* Card cvv */}
                                                                <Box className="last:w-[30%] max-[350px]:last:w-[100%] flex flex-col relative card_form ">
                                                                    <input
                                                                        type="password"
                                                                        inputMode="numeric"
                                                                        placeholder="CVV"
                                                                        className="focus-visible:outline-none"
                                                                        minLength={
                                                                            1
                                                                        }
                                                                        maxLength={
                                                                            3
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) => {
                                                                            if (
                                                                                /[0-9 ]/.test(
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            ) {
                                                                                setCardCVV(
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                            {/* Card Name */}
                                                            <Box className="card_form">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Name on card"
                                                                    className="focus-visible:outline-none"
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setCardName(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </Box>
                                                            {/* Continue Button */}
                                                            <Box>
                                                                <button
                                                                    className={`w-[100%] flex flex-row justify-center items-center mt-[12px] rounded-[4px] text-[14px] font-[600] p-[12px] border-[1px] [word-spacing:3px] ${
                                                                        isValidCardPay()
                                                                            ? "bg-[#1a1a1d] text-[#fff] cursor-pointer"
                                                                            : "bg-[#58585f] text-[#d4d4d4] cursor-not-allowed"
                                                                    } `}
                                                                    disabled={
                                                                        !isValidCardPay()
                                                                    }
                                                                    onClick={() => {
                                                                        handlePay();
                                                                    }}
                                                                >
                                                                    Continue To
                                                                    Pay ₹
                                                                    {
                                                                        paymentDetails.amount
                                                                    }
                                                                </button>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box className="w-[20%] max-[780px]:hidden mt-[54px] ml-[10%] h-auto mb-[10px] ">
                            <Box className="rounded-[12px] border-[1px] border-solid border-[#e2e2e5] min-h-[50px] p-[16px] mb-[20px] flex justify-center flex-col bg-[#ffffff] ">
                                <Box className="text-[#1a1a1d] text-[24px] font-[600] leading-[32px] ">
                                    Pay ₹{paymentDetails.amount}
                                </Box>
                                <Box className="text-[#878793] text-[14px] font-[400] leading-[24px] capitalize flex items-center ">
                                    <span>WYNK MUSIC</span>
                                    <span className="w-[4px] h-[4px] bg-[#1a1a1d] text-[#1a1a1d] mx-[5px] rounded-[50%] "></span>
                                    <span>{paymentDetails.validity}</span>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default PaymentProcess;
