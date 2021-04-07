import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/* https://codepen.io/gabrielferreira/pen/oYxNVy/

tenho que conseguir adaptar os ícones do fontWesome pra ficar com esse efeito maroto */

const StyledCurso = styled.div `

        label {
            height: 100px;
        }
       
        input[type="checkbox"] {
            display: none;            
        }
        input[type="checkbox"]:checked + .box {
            background-color: #007e90;
        }
        input[type="checkbox"]:checked + .box span {
            color: white;
            transform: translateY(50px);
        }
        input[type="checkbox"]:checked + .box span:before {
            transform: translateY(0px);
            opacity: 1;
        }

        .box {
            width: 270px;
            height: 100px;
            border: 1px solid #007e90;
            background-color: #fff;
            transition: all 250ms ease;
            will-change: transition;
            text-align: center;
            padding-top:30px;           
            cursor: pointer;
            font-family: "Dax", sans-serif;
            font-weight: 900;            
        }
        .box:active {
            transform: translateY(10px);
        }
        .box span {
            transform: translate(0, 30px);
            left: 0;
            right: 0;
            height: 100px;
            transition: all 300ms ease;
            font-size: 20px;
            font-weight: 550;
            user-select: none;
            color: #007e90;
        }
        .box span:before {
            transform: translate(0, 30px);
            font-size: 18px;
            font-family: FontAwesomeIcon;
            display: block;
            transform: translateY(-80px);
            opacity: 0;
            transition: all 300ms ease-in-out;
            font-weight: normal;
            color: white;
        }
        /* .front-end span:before {
            content: "\f0f4";
        } */
        
        p {
            color: #fff;
            font-family: "Dax", sans-serif;
            font-weight: 400;
        }
        p a {
            text-decoration: underline;
            font-weight: bold;
            color: #fff;
        }
        p span:after {
            content: "\f0e7";
            font-family: FontAwesome;
            color: yellow;
        }
`

function Curso( { name } ) {

    const handleClick = (name) => {
        

        console.log('Koca: handleClick ', name);
        
    }

    return (
        <StyledCurso>
            <div>
                <label>
                    <input 
                        type="checkbox" 
                        name={ name } 
                        value={ name }
                        onClick = { () => handleClick(name) }
                    />
                    <div className="front-end box">
                        <span>
                            { name } 
                        </span>
                    </div>
                </label>
            </div>
        </StyledCurso>        
    )
}
export default Curso