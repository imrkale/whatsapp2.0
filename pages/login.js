import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import {auth,provider} from '../firebase'
function login() {
    function signin()
    {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <div>
            <Container>
               
                <LoginContainer>
                    <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
                    <Button onClick={()=>signin()} varient="outlined">Sign in with Google</Button>
                </LoginContainer>
            </Container>
        </div>
    )
}

export default login

const Container=styled.div`
`;
const LoginContainer=styled.div`
    display: grid;
    place-items:center;
    margin-top:200px;
    >img{
        height:200px;
        width:200px;
    }
    >Button{
        margin:20px;
    }
`;