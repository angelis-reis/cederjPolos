import React from 'react'
import styled from 'styled-components'

const StyledRadioButton = styled.div `
    
    @import url("https://fonts.googleapis.com/css?family=Dax:400,900");
       
        .middle {
            width: 100%;
            text-align: center;
            
        }
        .middle h1 {
            font-family: "Dax", sans-serif;
            color: #fff;
        }
        .middle input[type="checkbox"] {
            display: none;
        }
        .middle input[type="checkbox"]:checked + .box {
            background-color: #007e90;
        }
        .middle input[type="checkbox"]:checked + .box span {
            color: white;
            transform: translateY(70px);
        }
        .middle input[type="checkbox"]:checked + .box span:before {
            transform: translateY(0px);
            opacity: 1;
        }
        .middle .box {
            width: 270px;
            height: 100px;
            border: 1px solid #007e90;
            background-color: #fff;
            transition: all 250ms ease;
            will-change: transition;
            display: inline-block;
            text-align: center;
            cursor: pointer;
            position: relative;
            font-family: "Dax", sans-serif;
            font-weight: 900;
        }
        .middle .box:active {
            transform: translateY(10px);
        }
        .middle .box span {
            position: absolute;
            transform: translate(0, 60px);
            left: 0;
            right: 0;
            transition: all 300ms ease;
            font-size: 18px;
            font-weight: 550;
            user-select: none;
            color: #007e90;
        }
        .middle .box span:before {
            font-size: 18px;
            font-family: FontAwesome;
            display: block;
            transform: translateY(-80px);
            opacity: 0;
            transition: all 300ms ease-in-out;
            font-weight: normal;
            color: white;
        }
        .middle .front-end span:before {
            content: "\f121";
        }
        .middle .back-end span:before {
            content: "\f0f4";
        }
        .middle p {
            color: #fff;
            font-family: "Dax", sans-serif;
            font-weight: 400;
        }
        .middle p a {
            text-decoration: underline;
            font-weight: bold;
            color: #fff;
        }
        .middle p span:after {
            content: "\f0e7";
            font-family: FontAwesome;
            color: yellow;
        }








`

interface Props {
    name: string;
}

function RadioButton( { name } ) {

    return (

        <StyledRadioButton>

            <div className="middle">

            <label>
                <input type="checkbox" name="radio" />
                <div className="front-end box">
                <span>
                    { name }
                </span>
                </div>
            </label>


            </div>

        </StyledRadioButton>

        
    )

    

}

export default RadioButton