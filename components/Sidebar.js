import React from 'react'
import styled from 'styled-components'
import {Avatar, Button, IconButton} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/search'
import * as EmailValidator from 'email-validator'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import {auth, db} from '../firebase'
import Chat from './Chat'
function Sidebar() {

    const [user]=useAuthState(auth);
    const userChatRef=db.collection('chats').where('users','array-contains',user.email);
    const [chatSnapshots]=useCollection(userChatRef)
    console.log(chatSnapshots);
    const createChat=()=>{
        const input=prompt('Please enter the email of the person to start the chat');
        if(!input) return null;
        if(EmailValidator.validate(input) && input!=user.email && !chatAlreadyExist(input))
        {
            db.collection('chats').add({
                users:[user.email,input]
            })   
        }
    }

    const chatAlreadyExist=(recipientemail)=>
            !!chatSnapshots?.docs.find((chat)=>chat.data().users.find((user)=>user===recipientemail)?.length>0);
    
   
    return (
        <div>
            <Container>
                <Header>

                    <UserAvatar src={user?.photoURL} onClick={()=>auth.signOut()}/>
                    <IconsContainer>

                        <IconButton>
                            <ChatIcon/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                        
                    </IconsContainer>

                </Header>

                <SearchBar>
                    <SearchIcon/>
                    <input type="text" placeholder="Search Chat"/>
                </SearchBar>
                
                <SideBarButton onClick={()=>createChat()}>
                    Start a new chat
                </SideBarButton>
                {
                    chatSnapshots?.docs.map((chats)=>(
                        <Chat key={chats.id} id={chats.id} users={chats.data().users}/>
                    ))
                }
            </Container>        
        </div>
    )
}


export default Sidebar

const Container=styled.div`

`;
const Header = styled.div`
    display:flex;
    align-items:center;
    position:sticky;
    z-index:2;
    top:0;
    background-color:white;
    justify-content:space-between;
    padding:10px;
    height:80px;
    border-bottom:1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity:0.8;
    }
`;

const IconsContainer = styled.div`
`;

const SearchBar = styled.div`
    display:flex;
    align-items:center;
    border:2px solid lightgray;
    border-radius:999px;
    margin:5px;
    padding:5px;
    >input{
        flex:1;
        border:none;
        outline:none;
    }
`;
const SideBarButton=styled(Button)`
    width:100%;
    &&&{
        border-top:1px solid whitesmoke;
        border-bottom:1px solid whitesmoke;
    }
`;